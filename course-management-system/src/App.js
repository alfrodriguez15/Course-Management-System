import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/aboutus" element={<h1>about us</h1>}></Route>
      <Route path="/services" element={<h1>services</h1>}></Route>
      <Route path="/signin" element={<h1>sign in</h1>}></Route>
    </Routes>
  )
}

export default App;
