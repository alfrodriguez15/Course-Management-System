import React from 'react'
import Navbar from '../components/Navbar'
import './Home.css'
import Button from 'react-bootstrap/Button';

function Home() {
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
                        <Button className='home-button' variant="primary">Learn More</Button>{' '}
                        <Button className='home-button' variant="primary">Sign In</Button>{' '}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
