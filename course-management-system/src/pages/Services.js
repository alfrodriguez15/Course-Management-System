import React from 'react';
import Navbar from '../components/Navbar';
import './Services.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import timetableImage from '../images/timetable.jpg';
import analyticsImage from '../images/analytics.jpg';
import courseScheduleImage from '../images/course_schedule.jpg';
import chatbotImage from '../images/chatbot.jpg';

function Services() {
    return (
        <>
            <Navbar />
            <div className='services-container'>
                <div className='services-title'>
                    <h1>Our Services</h1>
                </div>

                <Container>
                    <Row>
                        <Col>
                            <div className='section-container'>
                                <Row className='top-row'>
                                    <ServiceCard
                                        title="Virginia Tech Timetable of Classes"
                                        imageSrc={timetableImage}
                                        altText="Timetable of Classes"
                                    />
                                    <ServiceCard
                                        title="University DataCommons Course Analytics & Rate My Professor Course Reviews"
                                        imageSrc={analyticsImage}
                                        altText="Course Analytics"
                                    />
                                </Row>
                                <Row>
                                    <ServiceCard
                                        title="Chatbot For Course Recommendations"
                                        imageSrc={chatbotImage}
                                        altText="Chatbot"
                                    />
                                    <ServiceCard
                                        title="Personalized Course Schedules"
                                        imageSrc={courseScheduleImage}
                                        altText="Course Schedules"
                                    />
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

function ServiceCard({ title, imageSrc, altText }) {
    return (
        <Col md={6}>
            <Card className='service-card'>
                <Card.Img variant="top" src={imageSrc} alt={altText} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Services;