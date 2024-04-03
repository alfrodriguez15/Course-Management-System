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

# Route for user login
@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    # Get username and password from request
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Query the database to find the user by username and password
    user = user_collection.find_one({"email": username, "password": password})

    if user:
        # Set user session if login is successful
        session["username"] = username
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401


if __name__ == "__main__":
    # app.secret_key = os.environ.get("SECRET_KEY")
    app.run(debug=True)