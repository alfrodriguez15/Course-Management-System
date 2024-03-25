import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; // Import Link
// import { useNavigate } from 'react-router-dom'; // You don't need this if you're using Link

function Home() {
    // const navigate = useNavigate(); // Remove this if you're using Link

    // function handleClickSign() {
    //     navigate("/signin");
    // }

    return (
        <>
            <Navbar />
            <div>
                <div className='home'>
                    <div className='home-title'>
                        <h1 className='title-fragment'>Virginia Tech</h1>
                        <h1 className='title-fragment'>Course Management</h1>
                        <h1 className='title-fragment'>System</h1>
                    </div>
                    <p className='home-description-text'>
                        Manage your courses and schedules with our optimal course management system. We provide academic services similar to
                        DARS, Timetable of Classes, University DataCommons, etc.
                    </p>
                    <div className='home-buttons-container'>
                        <Link to="/login">
                            <Button className='home-button' variant="primary">Login</Button>
                        </Link>
                        <Link to="/services">
                            <Button className='home-button' variant="primary">Learn More</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
