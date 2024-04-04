from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

password = os.environ.get("MONGODB_PWD")
connection_string = f"mongodb+srv://course-ms:{password}@course-ms.u8bdkip.mongodb.net/?retryWrites=true&w=majority&appName=course-ms"
client = MongoClient(connection_string)
course_db = client.course_db
user_collection = course_db.users

# Route for user login and signup
@app.route("/auth", methods=["POST"])
@cross_origin()
def auth():
    data = request.json

    # Check if the request contains a "name" field, indicating a signup request
    if "name" in data:
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
   
        # Check if the password and confirm password fields match
        if password == confirm_password and not check_user:
        # Insert new user into the database
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
        else:
            if password != confirm_password:
                return jsonify({"message": "Passwords do not match"}), 401
            if check_user:
                return jsonify({"message": "Email already in use"}), 401
    else:
        
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

if __name__ == "__main__":
    app.secret_key = os.environ.get("SECRET_KEY")
    app.run(debug=True)