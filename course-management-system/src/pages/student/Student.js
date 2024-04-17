//import React, { useState } from 'react';
import './Student.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function Student(props) {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    // // Extract userData from location state when component mounts
    // useEffect(() => {
    //     if (props.location.state && props.location.state.userData) {
    //         const userData = props.location.state.userData;
    //         // Do something with the userData (e.g., set it to state)
    //         setUserData(userData);
    //     }
    // }, [props.location.state]);

    return (
        <div className="student-page">
            <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
            <div className={showSidebar ? "content-with-sidebar" : "content"}>
                <p>Welcome to the student page!</p>
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