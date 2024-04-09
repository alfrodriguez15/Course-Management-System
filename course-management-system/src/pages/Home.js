import React, { useState } from 'react';
import Navbar from '../components/Navbar';
//import Sidebar from './student/components/Sidebar';
import './Home.css';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

import homepageImage from '../images/homepage.jpg';
import icon1 from '../images/stud-icon.png';
import icon2 from '../images/prof-icon.png';
import icon3 from '../images/admin-icon.png';

function Home() {




    return (
        <>
            <Navbar />
            <div className='home'>

                <img src={homepageImage} alt="Homepage" className="homepage-image" />
                <div className="text-container">
                    <h1 className="title">Virginia Tech Course Management System</h1>
                    <p className="title-2">Manage your courses and schedules with ease.</p>
                </div>

                <div className="offer-section">
                    <h2>What We Offer</h2>
                </div>

                <div className='icon-img-container'>
                    <div className='icon-img'>
                        <img src={icon1} alt="Icon" className="icon" />
                    </div>
                    <div className='icon-img'>
                        <img src={icon2} alt="Icon" className="icon" />
                    </div>
                    <div className='icon-img'>
                        <img src={icon3} alt="Icon" className="icon" />
                    </div>
                </div>

                <div className="icon-texts-section">
                    <div className="icon-text">
                        <p>Student</p>
                        <p>Manage your courses and schedules as a student.</p>
                    </div>
                    <div className="icon-text">
                        <p>Professor</p>
                        <p>Easily manage your courses and communicate with students.</p>
                    </div>
                    <div className="icon-text">
                        <p>Administrator</p>
                        <p>Effortlessly oversee course management system and feedback</p>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Home;