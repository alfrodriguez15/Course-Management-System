//import React, { useState } from 'react';
import './Student.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useLocation } from 'react-router-dom';
import videoBg from './video/vt_course_video.mp4';
import scheduleImage from '../../images/help_schedule.PNG';
import courseImage from '../../images/help_course.PNG';
import chatbotImage from '../../images/help_chatbot.PNG';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

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

    const user_name = localStorage.getItem('user_name');

    return (
        <>
            <Sidebar />
            <div className="student-page">
                <div className="video-container">
                    <video src={videoBg} autoPlay loop muted className="video" />
                </div>
                <div className="student-text">
                    <h1>Welcome {user_name} to the student page!</h1>
                    <p>Navigate our resourses using the Sidebar Menu</p>
                </div>

                <div className="img-wrapper"> {/* New wrapper div */}
                    <div className="img-container">
                        <img src={scheduleImage} alt="Schedule" className="homepage-image" />
                        <img src={courseImage} alt="Course" className="homepage-image" />
                        <img src={chatbotImage} alt="Chatbot" className="homepage-image" />
                    </div>
                </div>
            </div>
            <Link to="/feedback" className='feedback-button'>
                <Button variant="secondary" size='lg'>Give Us Feedback</Button>
            </Link>
        </>
    );
}

export default Student;

