from dotenv import load_dotenv, find_dotenv
from flask import Flask, request, jsonify, session
import os
import pprint
from pymongo import MongoClient
from vtt import *

load_dotenv(find_dotenv())
password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://course-ms:{password}@course-ms.u8bdkip.mongodb.net/?retryWrites=true&w=majority&appName=course-ms"
client = MongoClient(connection_string)

course_db = client.course_db
test_user = {
    "name": "Jenny Tran",
    "email": "jennynt@vt.edu",
    "password": "password123",
    "role": "student",
    "graduation_date": "May 2024",
    "major": "Computer Science",
    "schedules": []
}

def insert_user_document(user_data):
    user_collection = course_db.users
    insert_id = user_collection.insert_one(user_data).inserted_id
    print(f"Inserted user document with id: {insert_id}")
    
def get_user_document(user_email):
    user_collection = course_db.users
    user_data = user_collection.find_one({"email": user_email})
    return user_data

def update_user_document(user_email, new_data):
    user_collection = course_db.users
    user_collection.update_one({"email": user_email}, {"$set": new_data})
    print(f"Updated user document with email: {user_email}")

def get_course_crn(term_year, semester, crn):
    course = get_crn(term_year, semester, crn)
    open = course.has_open_spots()
    return [course._course_data, open]

# course = get_crn('2024', Semester.SPRING, '21892')
# course = get_course_crn('2024', Semester.SPRING, '21892')
# course = search_timetable('2024', Semester.SPRING, Campus.BLACKSBURG, Pathway.ALL, '', SectionType.ALL, '', '13511', Status.ALL, Modality.ALL)
# course_data = [c._course_data for c in course]
# user = course_db.users.find_one({"email": "jenh@vt.edu", "password": "pass123"})
# user["_id"] = str(user["_id"])
# print(user)
        
# for c in course_data:
    
#     semester_str = c.get("semester").name
#     c["semester"] = semester_str
    
#     sectionType_str = c.get("section_type").name
#     c["section_type"] = sectionType_str
    
#     modality = c.get("modality")
#     if modality:
#         modality_str = modality.name
#         c["modality"] = modality_str
#     else:
#         c["modality"] = ""
    
#     schedule_keys = list(c.get("schedule").keys())
#     days_list = []
#     new_dict = {"Days": [], "Begin": "", "End": "", "Location": ""}
#     for s in schedule_keys:
#         days_list.append(s.name)
#         value = c.get("schedule")[s]
#         for v in value:
#             new_dict["Begin"] = v[0]
#             new_dict["End"] = v[1]
#             new_dict["Location"] = v[2]
#     new_dict["Days"] = days_list
#     c["schedule"] = new_dict
# pprint.pprint(course_data)
# update_user_document("jenh@vt.edu", {"name": "Jen Hoang", "password": "password1234"})

# feedback_collection = course_db.feedback
# feedback = feedback_collection.find()
# feedback_list = []
# for f in feedback:
#     f["_id"] = str(f["_id"])
#     feedback_list.append(f)
# print(feedback_list)
user_collection = course_db.users
new_schedule = {
    "semester": "FALL 2024",
    "courses": []
}
filter_criteria = {
    'email': 'jenp@vt.edu',
    'schedules.semester': 'FALL 2023'
}
update_operation = {
    '$pull': {
        'schedules': {'semester': 'FALL 2023'}  # Remove the entire schedule with the specified semester
    }
}
result = user_collection.update_one(filter_criteria, update_operation)