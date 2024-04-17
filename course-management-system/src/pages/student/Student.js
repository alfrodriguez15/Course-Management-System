//import React, { useState } from 'react';
import './Student.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useLocation } from 'react-router-dom';

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
        <div className="student-page">
            <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
            <div className={showSidebar ? "content-with-sidebar" : "content"}>
                <h1>Welcome {userData.name} to the student page!</h1>
                <h1>Email: {userData.email}</h1>
                <h1>Role: {userData.role}</h1>
                <h1>Degree: {userData.degree}</h1>
                <h1>Education: {userData.education}</h1>
                <h1>Graduation Date: {userData.graduation_date}</h1>
                {/* <Link to="/schedule">
                    <Button variant="primary">View Schedule</Button>
                </Link>
                <Link to="/courses">
                    <Button variant="primary">View Courses</Button>
                </Link> */}
            </div>
        </div>
    );
}

export default Student;