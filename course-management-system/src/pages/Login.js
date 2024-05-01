import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import './Login.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [major, setMajor] = useState('');
    const [degree, setDegree] = useState('');
    const [education, setEducation] = useState('');
    const [graduationDate, setGraduationDate] = useState(''); // Set the default value to the current month and year

    function handleClickSign() {

        axios.post('http://localhost:5000/login', {
            username,
            password
        })
            .then(response => {
                console.log(response.data); // Log the response from the backend
                localStorage.setItem('user_email', username);
                localStorage.setItem('user_name', response.data.name);
                navigate('/student', { state: { userData: response.data } });
            })
            .catch(error => {
                console.error(error); // Log any errors that occur during the request
                setLoginError(error.response.data.message); // Set the error message in state
            });
    }

    function handleClickSignUp() {

        axios.post('http://localhost:5000/signup', {
            name,
            email,
            password: newPassword,
            confirmPassword,
            major,
            degree,
            education,
            graduationDate  // Use the formatted graduationDate
        })
            .then(response => {
                console.log(response.data); // Log the response from the backend
                localStorage.setItem('user_email', email);
                localStorage.setItem('user_name', name);
                navigate('/student', { state: { userData: response.data } });
            })
            .catch(error => {
                console.error(error); // Log any errors that occur during the request
                setSignupError(error.response.data.message); // Set the error message in state
            });
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
                        {loginError && <p className="error">{loginError}</p>}
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
                            <input
                                type="major"
                                placeholder="Major *"
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                            />
                            <select
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
                            >
                                <option value="">Select Degree *</option>
                                <option value="Associate's Degree">Associate's Degree</option>
                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                                <option value="Master's Degree">Master's Degree</option>
                                <option value="phDoctoral Degree (Ph.D.)">Doctoral Degree (Ph.D.)</option>
                            </select>
                            <select
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                            >
                                <option value="">Select Education *</option>
                                <option value="College of Agriculture and Life Sciences">College of Agriculture and Life Sciences</option>
                                <option value="College of Architecture, Arts, and Design">College of Architecture, Arts, and Design</option>
                                <option value="Pamplin College of Business">Pamplin College of Business</option>
                                <option value="College of Engineering">College of Engineering</option>
                                <option value="College of Liberal Arts and Human Sciences">College of Liberal Arts and Human Sciences</option>
                                <option value="College of Natural Resources and Environment">College of Natural Resources and Environment</option>
                                <option value="College of Science">College of Science</option>
                            </select>

                            <span>Graduation Date: </span>
                            <input
                                type="month"
                                placeholder="YYYY-MM"
                                value={graduationDate}
                                onChange={(e) => setGraduationDate(e.target.value)}
                            />
                        </p>
                        {signupError && <p className="error">{signupError}</p>}
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