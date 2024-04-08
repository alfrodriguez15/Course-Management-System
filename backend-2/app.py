from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from flask_jsonpify import jsonpify
from pymongo import MongoClient
from parse_udc import parse_data
import os

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

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

    if user:
        # Set user session if login is successful
        session["username"] = username
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401
    
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