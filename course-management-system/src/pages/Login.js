import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Login.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [degree, setDegree] = useState('');
    const [education, setEducation] = useState('');
    const [graduationDate, setGraduationDate] = useState('');


    function handleClickSign() {
        navigate("/signin");
    }

    function handleClickSignUp() {
        navigate("/signup");
    }

    return (
        <>
            <Navbar />
            <div className='split-screen'>
                <div className='left'>

                    <div className='login'>
                        <div className='login-title'>
                            <h1 className='title-fragment'>Login</h1>
                        </div>
                        <p className='login-input'>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </p>
                        <div className='login-buttons-container'>
                            <Button className='login-button' variant="primary" onClick={handleClickSign}>Login</Button>{' '}
                        </div>
                    </div>

                </div>
                <div className='right'>

                    <div className='signup'>
                        <div className='signup-title'>
                            <h1 className='title-fragment'>Sign Up</h1>
                        </div>
                        <p className='signup-form'>
                            <input
                                type="text"
                                placeholder="Name *"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email *"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password *"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password *"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select Role *</option>
                                <option value="student">Student</option>
                                <option value="teacher">Professor</option>
                            </select>
                            <select
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            >
                                <option value="">Select Degree *</option>
                                <option value="highschool">Associate's Degree</option>
                                <option value="bachelors">Bachelor's Degree</option>
                                <option value="masters">Master's Degree</option>
                                <option value="phd">PhD</option>
                            </select>
                            <select
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                            >
                                <option value="">Select Education *</option>
                                <option value="Ag&LS">College of Agriculture and Life Sciences</option>
                                <option value="ArchArtDsgn">College of Architecture, Arts, and Design</option>
                                <option value="Business">Pamplin College of Business</option>
                                <option value="Engineering">College of Engineering</option>
                                <option value="LibArts&HS">College of Liberal Arts and Human Sciences</option>
                                <option value="NS&Env">College of Natural Resources and Environment</option>
                                <option value="Sscience">College of Science</option>
                            </select>
                            <input
                                type="date"
                                placeholder="Graduation Date"
                                value={graduationDate}
                                onChange={(e) => setGraduationDate(e.target.value)}
                            />
                        </p>
                        {/* Your sign-up form components go here name, email, password, role, major, grad date */}
                        <div className='signup-buttons-container'>
                            <Button className='signup-button' variant="primary" onClick={handleClickSignUp}>Sign Up</Button>{' '}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;