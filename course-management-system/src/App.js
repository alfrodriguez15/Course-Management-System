import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import About from './pages/About.js';
import Services from './pages/Services.js';
import Analytics from './pages/Analytics.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/aboutus" element={<About />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<h1>signup</h1>}></Route>
      <Route path="/analytics" element={<Analytics />}></Route>
    </Routes>
  )
}

export default App;
