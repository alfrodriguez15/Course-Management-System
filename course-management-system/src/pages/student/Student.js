//import React, { useState } from 'react';
import './Student.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useLocation } from 'react-router-dom';
import videoBg from './video/schedule_clip.mp4';
import icon1 from '../../images/stud-icon.png';
import icon2 from '../../images//prof-icon.png';
import icon3 from '../../images/admin-icon.png';

function Student(props) {
    const location = useLocation(); // Get the location object
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    useEffect(() => {
        if (location.state && location.state.userData) {
            const userData = location.state.userData;
            // Do something with the userData (e.g., set it to state)
            setUserData(userData);
        }
    }, [location.state]);

    return (
        <>
            <Sidebar />
            <div className="student-page">
                <div className="video-container">
                    <video src={videoBg} autoPlay loop muted className="video" />
                </div>
                <div className="content">
                    <h1>Welcome {userData.name} to the student page!</h1>
                    <p>Navigate our resourses using the Sidebar Menu</p>
                </div>

        
            </div>
            
        </>
    );
}

export default Student;