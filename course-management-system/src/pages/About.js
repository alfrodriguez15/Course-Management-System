import React from 'react';
import Navbar from '../components/Navbar';
import './About.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function About() {
    return (
        <>
            <Navbar />
            <div className='about-us-container'>
                <div className='about-us-title'>
                    <h1>About Us</h1>
                </div>

                <Container>
                    <Row>
                        <Col>
                            <Card className='section-container'>
                                <Card.Body>
                                    <Card.Title>Who We Are</Card.Title>
                                    <Card.Text>
                                        We are a dedicated team of five passionate individuals driven by a shared vision
                                        to assist Virginia Tech students in managing their courses and time. As upperclassmen,
                                        we understand and recognize the struggles and anxiety students feel as they register for
                                        their courses and manage their schedules. To mitigate that, we have come up with the solution
                                        of combining the most essential course management resources along with additional functionality
                                        that will certainly assist students in choosing the right courses and managing their time.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card className='section-container'>
                                <Card.Body>
                                    <Card.Title>Goals/Vision</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Improve the current process of class scheduling</ListGroup.Item>
                                        <ListGroup.Item>Provide a versatile course management tool that is also easy to navigate</ListGroup.Item>
                                        <ListGroup.Item>Help students better prepare for courses and manage their time</ListGroup.Item>
                                        <ListGroup.Item>Provide students with guidance on future course planning and selection</ListGroup.Item>
                                        <ListGroup.Item>Help students make informed decisions through organized data</ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Link to="/feedback" className='feedback-button'>
                <Button variant="secondary" size='lg'>Give Us Feedback</Button>
            </Link>
        </>
    )
}

export default About;
