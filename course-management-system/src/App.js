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
import Courses from './pages/student/components/CollapsibleTable.js';

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
      <Route path="/courses" element={<Courses />}></Route>
    </Routes>
  )
}

export default App;
