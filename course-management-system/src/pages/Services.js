import React from 'react'
import Navbar from '../components/Navbar';
import './Services.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

function Services() {
    return (
        <>
            <Navbar />
            <div className='services-container'>
                <div className='services-title'>
                    <h1>Services</h1>
                </div>

                <div className='section-container'>
                    <h2 className='section-title'>Our Services</h2>

                    {/* Public Services */}
                    <ListGroup className='list-group'>
                        <ListGroup.Item variant="info">Virginia Tech Timetable of Classes</ListGroup.Item>
                        <ListGroup.Item variant="info">University DataCommons Course Analytics</ListGroup.Item>
                        <ListGroup.Item variant="info">Viewing Course Reviews</ListGroup.Item>
                    </ListGroup>

                    {/* Private Services */}
                    <ListGroup className='list-group'>
                        <ListGroup.Item variant="info">Personalized Course History</ListGroup.Item>
                        <ListGroup.Item variant="info">Degree Requirements and Progress</ListGroup.Item>
                        <ListGroup.Item variant="info">Write Course Reviews</ListGroup.Item>
                        <ListGroup.Item variant="info">Log Study Hours</ListGroup.Item>
                        <ListGroup.Item variant="info">Chatbot For Course Recommendations</ListGroup.Item>
                    </ListGroup>
                </div>

                <div className='section-container'>
                    <h2 className='section-title'>How To Use Our System</h2>
                    <p className='section-body'>jklsjfkldsajklfdsaj.</p>
                </div>
            </div>
            <Link to="/feedback" className='feedback-button'>
                <Button variant="secondary" size='lg'>Give Us Feedback</Button>
            </Link>
        </>
    )
}

export default Services
