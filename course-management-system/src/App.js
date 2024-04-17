import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import About from './pages/About.js';
import Services from './pages/Services.js';
import NewUser from './pages/student/NewUser.js';
import Student from './pages/student/Student.js';
import Schedule from './pages/student/Schedule.js';
import Analytics from './pages/Analytics.js';
import Ratings from './pages/student/Ratings.js';
import Professors from './pages/student/Professors.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/aboutus" element={<About />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/newuser" element={<NewUser />}></Route>
      <Route path="/student" element={<Student />}></Route>
      <Route path="/schedule" element={<Schedule />}></Route>
      
      <Route path="/signup" element={<h1>signup</h1>}></Route>
      <Route path="/analytics" element={<Analytics />}></Route>
      <Route path = "/ratings" element = {<Ratings />}></Route> 
      <Route path = "/professors" element = {<Professors/>}></Route>
    </Routes>
  )
}

export default App;
