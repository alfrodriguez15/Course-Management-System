from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from flask_jsonpify import jsonpify
from pymongo import MongoClient
from parse_udc import search_by_course_prof
from scrape_rmp import get_professors_by_school_and_name, get_stats_for_prof
from vtt import *
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://course-ms:{password}@course-ms.u8bdkip.mongodb.net/?retryWrites=true&w=majority&appName=course-ms"
client = MongoClient(connection_string)
course_db = client.course_db
user_collection = course_db.users
feedback_collection = course_db.feedback

# Route for user signup
@app.route("/signup", methods=["POST"])
@cross_origin()
def signup():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirmPassword")
    role = data.get("role")
    degree = data.get("degree")
    education = data.get("education")
    graduation_date = data.get("graduationDate")

    # Check if the email is already in use
    check_user = user_collection.find_one({"email": email})

    if not name or not email or not password or not confirm_password or not role or not degree or not education or not graduation_date:
        return jsonify({"message": "All fields must be filled out"}), 400
    elif password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400
    elif check_user:
        return jsonify({"message": "Email already in use"}), 400
    else:
        user_collection.insert_one({
            "name": name,
            "email": email,
            "password": password,
            "role": role,
            "degree": degree,
            "education": education,
            "graduation_date": graduation_date
        })
        return jsonify({"message": "Signup successful"}), 200

# Route for user login
@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    data = request.json

    username = data.get("username")
    password = data.get("password")
    
    # Query the database to find the user by username and password for login
    user = user_collection.find_one({"email": username})

    if user:
        if user["password"] == password:
            # Password matches
            session["username"] = username
            user["_id"] = str(user["_id"])
            return jsonify(user), 200
        else:
            # Password doesn't match
            return jsonify({"message": "Invalid password"}), 400
    else:
        # User with the provided email not found
        return jsonify({"message": "Invalid username"}), 400
    
@app.route("/addcourse", methods=["POST"])
@cross_origin()
def add_course():
    data = request.json
    crn = int(data.get("crn"))
    subject = data.get("subject")
    code = int(data.get("code"))
    name = data.get("name")
    section_type = data.get("section_type")
    modality = data.get("modality")
    credit_hours = int(data.get("credit_hours"))
    capacity = int(data.get("capacity"))
    professor = data.get("professor")
    schedule_days = data.get("schedule_days")
    schedule_begin = data.get("schedule_begin")
    schedule_end = data.get("schedule_end")
    schedule_location = data.get("schedule_location")
    user_email = data.get("user_email")
    semester = data.get("semester")

    # Check if the crn is already added
    user = user_collection.find_one({
        "email": user_email
    })
    user_schedules = user['schedules']
    for schedule in user_schedules:
        if schedule['semester'] == semester:
            courses = schedule['courses']
            for course in courses:
                print()
                if course['crn'] == crn:
                    return jsonify({"message": "Course already exists!"}), 400
                
    # add the course
    new_course = {
        "crn": crn,
        "subject": subject,
        "code": code,
        "name": name,
        "section_type": section_type,
        "modality": modality,
        "credit_hours": credit_hours,
        "capacity": capacity,
        "professor": professor,
        "days": " ".join(schedule_days),
        "begin_time": schedule_begin,
        "end_time": schedule_end,
        "location": schedule_location
    }

    result = user_collection.update_one(
        {
            "email": user_email  # Replace with the name of the user
        },
        {
            "$push": {
                "schedules.$[schedule].courses": new_course
            }
        },
        array_filters=[{"schedule.semester": semester}]  # Specify the semester of the schedule
    )

    return jsonify({"message": "Course added"}), 200

@app.route("/deletecourse", methods=["POST"])
@cross_origin()
def delete_course():
    data = request.json
    crn = int(data.get("crn"))
    user_email = data.get("email")
    semester = data.get("semester")

    filter_criteria = {
    'email': user_email,
    'schedules.semester': semester,
    'schedules.courses.crn': crn
    }

    update_operation = {
    '$pull': {
        'schedules.$.courses': {'crn': crn}
    }
    }
    
    result = user_collection.update_one(filter_criteria, update_operation)
    
    if result.modified_count == 0:
        return jsonify({"message": "Course not found"}), 404
    else:
        return jsonify({"message": "Course deleted"}), 200

# Route for finding courses
@app.route("/courses", methods=["POST"])
@cross_origin()
def courses():
    data = request.json
    year = data.get("selectYear")
    semester = Semester[data.get("selectSemester")]
    campus = Campus[data.get("selectCampus")]
    pathway = Pathway[data.get("selectPathway")]
    subject = data.get("selectSubject")
    sectionType = SectionType[data.get("selectSectionType")]
    code = data.get("selectCode")
    crn = data.get("selectCrn")
    status = Status[data.get("selectStatus")]
    modality = Modality[data.get("selectModality")]
    
    course = search_timetable(year, semester, campus, pathway, subject, sectionType, code, crn, status, modality)
    if course:
        course_data = [c._course_data for c in course]
        for c in course_data:
            
            semester_str = c.get("semester").name
            c["semester"] = semester_str
            
            sectionType_str = c.get("section_type").name
            c["section_type"] = sectionType_str
            
            modality = c.get("modality")
            if modality:
                modality_str = modality.name
                c["modality"] = modality_str
            else:
                c["modality"] = ""
                
            schedule_keys = list(c.get("schedule").keys())
            days_list = []
            new_dict = {"Days": [], "Begin": "", "End": "", "Location": ""}
            for s in schedule_keys:
                days_list.append(s.name)
                value = c.get("schedule")[s]
                for v in value:
                    new_dict["Begin"] = v[0]
                    new_dict["End"] = v[1]
                    new_dict["Location"] = v[2]
            new_dict["Days"] = days_list
            c["schedule"] = new_dict
            
        return jsonify(course_data), 200
    else:
        return jsonify({"message": "Course not found. Make sure your search options are correct."}), 404

@app.route("/schedule", methods=["POST"])
@cross_origin()
def schedule():
    data = request.json
    email = data.get('email')
    user = user_collection.find_one({"email": email})

    return jsonify(user['schedules']), 200

@app.route("/addschedule", methods=["POST"])
@cross_origin()
def add_schedule():
    data = request.json
    email = data.get('email')
    semester = data.get('newSemesterName')

    new_course = {
        "crn": 0,
        "subject": "",
        "code": 0,
        "name": "",
        "section_type": "",
        "modality": "",
        "credit_hours": 0,
        "capacity": 0,
        "professor": "",
        "days": "",
        "begin_time": "",
        "end_time": "",
        "location": ""
    }
    
    new_schedule = {
        "semester": semester,
        "courses": [new_course]
    }
    
    filter_criteria = {
    'email': email
    }

    update_operation = {
    '$push': {
        'schedules': new_schedule
    }
    }
    result = user_collection.update_one(filter_criteria, update_operation)

    if result.modified_count == 0:
        return jsonify({"message": "User not found"}), 404
    else:
        return jsonify({"message": "Schedule added"}), 200
    
@app.route("/deleteschedule", methods=["POST"])
@cross_origin()
def delete_schedule():
    data = request.json
    email = data.get('email')
    semester = data.get('semester')

    filter_criteria = {
    'email': email,
    'schedules.semester': semester
    }
    
    update_operation = {
    '$pull': {
        'schedules': {'semester': semester}  # Remove the entire schedule with the specified semester
    }
    }
    result = user_collection.update_one(filter_criteria, update_operation)
    if result.modified_count == 0:
        return jsonify({"message": "Schedule not found"}), 404
    else:
        return jsonify({"message": "Schedule deleted"}), 200
    

@app.route("/analytics", methods=["POST"])
@cross_origin()
def getAnalytics():
    data = request.json
    subject = data.get("subject")
    code = data.get("code")
    prof = data.get("professor")
 
    df = search_by_course_prof(subject, int(code), prof)

    df_list = df.values.tolist()
    return jsonpify([sublist[:2] + sublist[6:20] for sublist in df_list])

@app.route("/rmp", methods=["POST"])
@cross_origin()
def getRMPData():
    data = request.json
    prof = data.get("professor")

    prof_name = prof.split(" ")
    search_name = prof_name[0][0] + " " + prof_name[-1]

    prof_id = get_professors_by_school_and_name(1349, search_name)

    stats = get_stats_for_prof(prof_id, prof, "Virginia Tech")
    return jsonpify(stats)

@app.route("/submitfeedback", methods=["POST"])
@cross_origin()
def submitFeedback():
    data = request.json
    value = data.get("value")
    feedback = data.get("feedback")

    if value == 0:
        return jsonify({"message": "Invalid value"}), 400
    if not feedback:
        return jsonify({"message": "Feedback cannot be empty"}), 400
    else:
        feedback_collection.insert_one({
            "value": value,
            "feedback": feedback
        })
        return jsonify({"message": "Feedback submitted, Thank you!"}), 200
    
@app.route("/getfeedback", methods=["GET"])
@cross_origin()
def getFeedback():
    feedback = feedback_collection.find()
    feedback_list = []
    for f in feedback:
        f["_id"] = str(f["_id"])
        feedback_list.append(f)
    return jsonpify(feedback_list)

if __name__ == "__main__":
    app.secret_key = os.environ.get("SECRET_KEY")
    app.run(debug=True)