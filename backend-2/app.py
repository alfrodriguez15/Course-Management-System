from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from flask_jsonpify import jsonpify
from pymongo import MongoClient
from parse_udc import parse_data
from vtt import *
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://course-ms:{password}@course-ms.u8bdkip.mongodb.net/?retryWrites=true&w=majority&appName=course-ms"
client = MongoClient(connection_string)
course_db = client.course_db
user_collection = course_db.users

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
    user = user_collection.find_one({"email": username, "password": password})
    user["_id"] = str(user["_id"])

    if user:
        # Set user session if login is successful
        session["username"] = username
        return jsonify(user), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401

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

@app.route("/analytics", methods=["POST"])
@cross_origin()
def getAnalytics():
    data = request.json
    years = data.get("years")
    terms = data.get("terms")
    subject = data.get("subject")
    course = data.get("course")

    df = parse_data(years, terms, subject, course)

    df_list = df.values.tolist()
    return jsonpify(df_list)

if __name__ == "__main__":
    app.secret_key = os.environ.get("SECRET_KEY")
    app.run(debug=True)