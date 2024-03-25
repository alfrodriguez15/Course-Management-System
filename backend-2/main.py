from dotenv import load_dotenv, find_dotenv
import os
import pprint
from pymongo import MongoClient
from vtt import get_crn, Semester

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
course = get_course_crn('2024', Semester.SPRING, '21892')
# insert_user_document(test_user)
print(course)
# update_user_document("jenh@vt.edu", {"name": "Jen Hoang", "password": "password1234"})