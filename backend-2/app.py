from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from flask_jsonpify import jsonpify
from pymongo import MongoClient
from parse_udc import search_by_course_prof
from scrape_rmp import get_professors_by_name, get_prof_stats
from vtt import *
import os
import google.generativeai as genai
from datetime import date
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

password = os.environ.get("MONGODB_PWD")
key = os.environ.get("API_KEY")
genai.configure(api_key=key)
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
    major = data.get("major")
    degree = data.get("degree")
    education = data.get("education")
    graduation_date = data.get("graduationDate")

    # Check if the email is already in use
    check_user = user_collection.find_one({"email": email})

    if not name or not email or not password or not confirm_password or not major or not degree or not education or not graduation_date:
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
            "major": major,
            "degree": degree,
            "education": education,
            "graduation_date": graduation_date,
            "schedules": []
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
    
@app.route("/editprofile", methods=["POST"])
@cross_origin()
def editProfile():
    data = request.json
    email = data.get("user_email")
    edited_data = data.get("editedUserData")
    
    filter_criteria = {
    'email': email,
    }

    update_operation = {
    '$set': {
        'name': edited_data.get("name"),
        'email': edited_data.get("email"),
        'password': edited_data.get("password"),
        'major': edited_data.get("major"),
        'degree': edited_data.get("degree"),
        'education': edited_data.get("education"),
        'graduation_date': edited_data.get("graduation_date")
    }
    }

    result = user_collection.update_one(filter_criteria, update_operation)
    if result.modified_count == 0:
        return jsonify({"message": "User not found"}), 404
    else:
        return jsonify({"message": "Profile updated"}), 200
    
@app.route("/getprofile", methods=["POST"])
@cross_origin()
def getProfile():
    data = request.json
    email = data.get("user_email")
    user = user_collection.find_one({"email": email})
    user["_id"] = str(user["_id"])
    return jsonify(user), 200
    
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
    
    new_schedule = {
        "semester": semester,
        "courses": []
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

@app.route("/editsemestername", methods=["POST"])
@cross_origin()
def edit_semester_name():
    data = request.json
    email = data.get('email')
    old_semester = data.get('oldSemesterName')
    new_semester = data.get('newSemesterName')

    filter_criteria = {
    'email': email,
    'schedules.semester': old_semester
    }

    update_operation = {
    '$set': {
        'schedules.$.semester': new_semester
    }
    }

    result = user_collection.update_one(filter_criteria, update_operation)
    if result.modified_count == 0:
        return jsonify({"message": "Semester not found"}), 404
    else:
        return jsonify({"message": "Semester name updated"}), 200

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

    prof_id = get_professors_by_name(search_name)

    stats = get_prof_stats(prof_id, prof)
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

#Should only be called when no semester is provided. Might need to fine tune based on
#if the next semester is available or not. Won't be using until a single constraint (like subject) works
def getSemester():
    currMonth = date.today().month
    currSem = Semester.WINTER
    if currMonth >= 9 and currMonth < 12:
        currSem = Semester.FALL
    elif currMonth >= 6:
        currSem = Semester.SUMMER
    elif currMonth >= 1:
        currSem = Semester.SPRING
    return currSem

# def coursesToString(courses: Course):
    #Make a course into a string based on its data
    #kept it simplistic for now but this should make it easy for Gemini to access course data
    # courseStr = ""
    # for c in courses:
    #     courseStr += "Name : " Course.get_Name(c)

#Helper method to get the pathway from the user input
def findPathway(question):
    pathways = {
        "Pathway 1A": [Pathway.PATH_1A], 
        "Pathway 1F": [Pathway.PATH_1F],
        "Pathway 2": [Pathway.PATH_2], 
        "Pathway 3": [Pathway.PATH_3], 
        "Pathway 4": [Pathway.PATH_4],
        "Pathway 5A": [Pathway.PATH_5A], 
        "Pathway 5F": [Pathway.PATH_5F],
        "Pathway 6": [Pathway.PATH_6A],
        "Pathway 6D":[Pathway.PATH_6D],
        "Pathway 7":[Pathway.PATH_7]
    }
    question_lower = question.lower()
    for pathway, abbreviation, in pathways.items():
        if any(" " + pathway.lower() + " course" in question_lower for sub in pathway):
            return abbreviation
    return Pathway.ALL

def findSubject(question):
    subjects = {
    "21st Century Studies": ["C21S"],
    "Accounting & Information Systems": ["ACIS"],
    "Advertising": ["ADV"],
    "Aerospace and Ocean Engineering": ["AOE"],
    "Africana Studies": ["AFST"],
    "Agr, Leadership, & Comm. Ed.": ["ALCE"],
    "Agricultural and Applied Econo": ["AAEC"],
    "Agriculture and Life Sciences": ["ALS"],
    "Agriculutral Technology": ["AT"],
    "American Indian Studies": ["AINS"],
    "Animal and Poultry Sciences": ["APSC"],
    "Appalachian Studies": ["APS"],
    "Apparel, Housing, & Resour Mgt": ["AHRM"],
    "Arabic": ["ARBC"],
    "Architecture": ["ARCH"],
    "Architecture, Arts, and Design": ["AAD"],
    "Art and Art History": ["ART"],
    "Behavioral Decision Science": ["BDS"],
    "Biochemistry": ["BCHM"],
    "Biological Sciences": ["BIOL"],
    "Biological Systems Engineering": ["BSE"],
    "Biomed & Veterinary Sciences": ["BMVS"],
    "Biomed Sci & Pathobiology": ["BMSP"],
    "Biomedical Engr & Sciences": ["BMES"],
    "Building Construction": ["BC"],
    "Business": ["BUS"],
    "Business Information Tech": ["BIT"],
    "Career and Technical Education": ["EDCT"],
    "Chemical Engineering": ["CHE"],
    "Chemistry": ["CHEM"],
    "Chinese": ["CHN"],
    "Cinema": ["CINE"],
    "Civil and Environmental Engineering": ["CEE"],
    "Classics": ["CLA"],
    "College of Science": ["COS"],
    "Communication": ["COMM"],
    "Communication Studies": ["CMST"],
    "Comp Modeling & Data Analytics": ["CMDA"],
    "Computer Science": ["CS"],
    "Construction Engineering & Mgt": ["CEM"],
    "Consumer Studies": ["CONS"],
    "Cooperative Education Program": ["CEP"],
    "Criminology": ["CRIM"],
    "Crop and Soil Environmental Science": ["CSES"],
    "Dairy Science": ["DASC"],
    "Dance": ["DANC"],
    "Economics": ["ECON"],
    "Education, Counseling": ["EDCO"],
    "Education, Curriculum and Instruction": ["EDCI"],
    "Educational Psychology": ["EDEP"],
    "Electrical & Computer Engineering": ["ECE"],
    "Engineering": ["ENGR"],
    "Engineering Education": ["ENGE"],
    "Engineering Science and Mechanics": ["ESM"],
    "English": ["ENGL"],
    "Entomology": ["ENT"],
    "Environmental Science": ["ENSC"],
    "Family and Consumer Science": ["FCS"],
    "Fashion Merchandising & Design": ["FMD"],
    "Finance, Insurance, and Business": ["FIN"],
    "Financial Aid": ["FNAD"],
    "Fine Arts": ["FA"],
    "Fish and Wildlife Sciences": ["FIW"],
    "Food Science and Technology": ["FST"],
    "Foreign Language": ["FL"],
    "Forest Resources & Eviron Conservation": ["FREC"],
    "Free Elective": ["VT"],
    "French": ["FR"],
    "Geography": ["GEOG"],
    "Geosciences": ["GEOS"],
    "German": ["GER"],
    "Greek": ["GR"],
    "Hebrew": ["HEB"],
    "History": ["HIST"],
    "Horticulture": ["HORT"],
    "Hospitality and Tourism Management": ["HTM"],
    "Human Development": ["HD"],
    "Human Nutrition, Foods, and Exercise": ["HNFE"],
    "Humanities": ["HUM"],
    "Industrial and Systems Engineering": ["ISE"],
    "Industrial Design": ["IDS"],
    "Instructional Design & Tech": ["EDIT"],
    "Integrated Science": ["ISC"],
    "Interior Design": ["ITDS"],
    "International Studies": ["IS"],
    "Italian": ["ITAL"],
    "Japanese": ["JPN"],
    "Journalism and Mass Communication": ["JMC"],
    "Judaic Studies": ["JUD"],
    "Korean": ["KOR"],
    "Landscape Architecture": ["LAR"],
    "Latin": ["LAT"],
    "Leadership Studies": ["LDRS"],
    "Liberal Arts and Human Science": ["LAHS"],
    "Management": ["MGT"],
    "Marketing": ["MKTG"],
    "Materials Science and Engineering": ["MSE"],
    "Mathematics": ["MATH"],
    "Mechanical Engineering": ["ME"],
    "Meteorology": ["MTRG"],
    "Military Navy": ["MN"],
    "Military Sciences (AROTC)": ["MS"],
    "Military, Aerospace Studies": ["AS"],
    "Mining and Minerals Engineerin": ["MINE"],
    "Music": ["MUS"],
    "Nanoscience": ["NANO"],
    "Natural Resources": ["NR"],
    "Neuroscience": ["NEUR"],
    "Nuclear Science & Engineering": ["NSEG"],
    "Peace Studies": ["PSVP"],
    "Philosophy": ["PHIL"],
    "Philosophy, Politics, and Econ": ["PPE"],
    "Physics": ["PHYS"],
    "Plant Pathology, Physiology, a": ["PPWS"],
    "Political Science": ["PSCI"],
    "Population Health Sciences": ["PHS"],
    "Portuguese": ["PORT"],
    "Property Management": ["PM"],
    "Psychology": ["PSYC"],
    "Public Relations": ["PR"],
    "Real Estate": ["REAL"],
    "Religion and Culture": ["RLCL"],
    "Residential Environment & Design": ["RED"],
    "Russian": ["RUS"],
    "School of Plant & Environmental Science": ["SPES"],
    "School of Pub & International Affairs": ["SPIA"],
    "Science Technology Studies": ["STS"],
    "Science, Technology, & Law": ["STL"],
    "Sociology": ["SOC"],
    "Spanish": ["SPAN"],
    "Statistics": ["STAT"],
    "Summer Academy": ["SUMA"],
    "Sustainable Biomaterials": ["SBIO"],
    "Systems Biology": ["SYSB"],
    "Technology Education": ["EDTE"],
    "Theatre and Cinema": ["TA"],
    "Trans Biol Medicine & Health": ["TBMH"],
    "University Course Series": ["UNIV"],
    "University Honors Program": ["UH"],
    "University Registrar": ["REG"],
    "Urban Affairs and Planning": ["UAP"],
    "Water": ["WATR"],
    "Women's and Gender Studies": ["WGS"]
}

    
    question_lower = question.lower()
    for subject, abbreviations, in subjects.items():
        if any(" " + subject.lower() + " course" in question_lower for sub in subject):
            return abbreviations
    for subject, abbreviations in subjects.items():
        if any(" " + abbr.lower() + " course" in question_lower for abbr in abbreviations):
            return abbreviations
    return None
        

# print(courses["Subject"])
#establishing the values to give 
def searchCourses(subject):
    year = str(date.today().year) #NOTE: this, semester, section type, campus, etc should be able to change on suer input
    semester = getSemester()
    campus = Campus.BLACKSBURG
    # pathway = findPathway()
    pathway = Pathway.ALL
    sectionType = SectionType.ALL
    code = ""
    crn = ""
    status = Status.OPEN
    modality = Modality.ALL

    courses = search_timetable(year, semester, campus, pathway, subject, sectionType, code, crn, status, modality)
    # print(courses)
    return courses

#consider RAG approach
@app.route('/chatbot', methods=['POST'])
def chatbot():
    # Set up the model
    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
    "max_output_tokens": 8192,
    }

    safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    ]

    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                generation_config=generation_config,
                                safety_settings=safety_settings)
    chat = model.start_chat(history=[])
    instruction = """You are a chatbot assistant who helps the user by 
    showing appropriate courses based on their constraints such as course name, professor, subject, year, semester, campus and status
    or credit hours. Include information such as professor, crn, course name, credit hours, and class time/days/location for every course you respond with 
    (you can include any other information you believe is relevant). Please format the response in proper HTML format as a div. DO NOT RETURN ANY OTHER FORMAT. Apply this for your entire response. 
    Use <strong> / <b> and <i> as needed for important information.
    Per course, have something that looks like 
    this line will have the Course Name (use <b> and <i> for it) (go into a new line for the next part)
    This line is a small description saying why might someone want to take this course. have fun with it (go into a new line for the next part)
    any relevant details in list form form like CRN, credit hours, professor etc. Use <b> to differentiate between data and title 
    (base what you include here on previous instructions).
    add an empty line between each course listed for readability. 
    Provide a suggestion for the following inquiry: """ #start by sending a welcome message and have a friendly welcoming tone."""
    # response = chat.send_message(instruction)
    # print(f"Chatbot: {response.text}")
    # print('\n')
    # while(True):
    userInput = request.json.get("message")
    if(userInput.strip() == ''):
        return 'Please provide some input' #should ideally never get here if react submit is programmed well
    question = instruction + userInput

    subject = findSubject(question)
    #subject not necessary, could make it CRN or pathway as well?
    #also, need to find a way to make it so that it can get courses from more than 1 subject. This might 
    #be very time consuming tho. Might keep it as is for now (also could implement streaming for a response that might look faster)
    #Possibly send a different prompt that just returns a list of all the subjects the chatbot needs to fulfill a request
    #based on that, have it make different queries to the list while it still has subjects it needs. It can probably look through the
    #list and determine which abbreviations fit what is being asked for
    if subject:
        courses = searchCourses(subject)
        courseStr = ""
        for c in courses:
            #for fields that are not str might need to have a function that turns them into strings by dereferencing and changing them based
            #on the API values
            #NOTE:remember to add these changes to app.py in repo
            # data = c._course_data #added but not used yet
            cName = Course.get_subject(c) + " " + Course.get_code(c) + ": " + Course.get_name(c) #added
            cProfessor = Course.get_professor(c)
            cYear = Course.get_year(c)
            cSemester = Course.get_semester(c)
            cCredits = Course.get_credit_hours(c)
            crn = Course.get_crn(c) # added
            schedule = Course.get_schedule(c)
            #use schedule_keys thing to get days here
            #use something similar for modality
            schedule_keys = list(schedule.keys())
            days_list = []
            new_dict = {"Days": [], "Begin": "", "End": "", "Location": ""}
            for s in schedule_keys:
                days_list.append(s.name)
                value = Course.get_schedule(c)[s]
                for v in value:
                    new_dict["Begin"] = v[0]
                    new_dict["End"] = v[1]
                    new_dict["Location"] = v[2]
            new_dict["Days"] = days_list
            # c["schedule"] = new_dict
            # days = new_dict.get("Days")[0] + ", " + new_dict.get("Days")[1]
            days = ' '.join([str(elem) for elem in days_list])
            begins = new_dict.get("Begin")
            ends = new_dict.get("End")
            classTime = "from " + begins + " to " + ends
            location = new_dict.get("Location")
            
            #
            courseStr += "| Name: " + cName + "| Professor: " + cProfessor + "| Semester: Fall" + " " + cYear + "| Credit Hours: " + cCredits  + "| CRN: " + crn + "|Days and time" + days + classTime + "|Location: " + location + "\n"
            #string above was definitely modified   
            # print(courseStr)     
        question += ". You can use the following data to provide 5 distinct results that fit the request(unless they ask for different sections of the same course). If they ask for  a schedule only provide 1: " + courseStr
        # print(courseStr)
    response = chat.send_message(question)
    # print('\n')
    # print(f"Chatbot: {response.text}")
    # print('\n')
    return response.text

if __name__ == "__main__":
    app.secret_key = os.environ.get("SECRET_KEY")
    app.run(debug=True)