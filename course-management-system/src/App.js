import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import About from './pages/About.js';
import Services from './pages/Services.js';
import NewUser from './pages/student/NewUser.js';
import Student from './pages/student/Student.js';
import Schedule from './pages/student/services/Schedule.js';
import Analytics from './pages/Analytics.js';
import Ratings from './pages/student/services/Ratings.js';
import Feedback from './pages/student/services/Feedback.js';
import Courses from './pages/student/services/Courses.js';
import AboutStudent from './pages/student/AboutStudent.js';
import ServicesStudent from './pages/student/ServicesStudent.js';
import EditSchedule from './pages/student/services/EditSchedule.js';
import Reviews from './pages/Reviews.js';
import Profile from './pages/student/Profile.js';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/aboutus" element={<About />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route path="/login" element={<Login />}></Route>

      <Route path="/newuser" element={<NewUser />}></Route>
      <Route path ="/profile" element ={<Profile />}></Route>
      <Route path="/student" element={<Student />}></Route>
      <Route path="/schedule" element={<Schedule />}></Route>
      <Route path="/Courses" element={<Courses />}></Route>
      <Route path="/analytics" element={<Analytics />}></Route>
      <Route path = "/ratings" element = {<Ratings />}></Route> 
      <Route path="/abtstudent" element={<AboutStudent />}></Route>
      <Route path="/servstudent" element={<ServicesStudent />}></Route>
      <Route path="/editSchedule" element={<EditSchedule />}></Route>
      <Route path="/feedback" element={<Feedback />}></Route>
      <Route path="/reviews" element={<Reviews />}></Route>
    </Routes>
  )
}

export default App;
