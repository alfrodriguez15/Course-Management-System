import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import './Login.css'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleClickSign() {
        navigate("/signin");
    }

    /**
     *    function handleClickLearn() {
        navigate("/services");
    }
     */
 

    function handleClickSignUp() {
        navigate("/signup");
    }

    return (
        <>
            <Navbar />
            <div>
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

                <div className="signup-button-container">
                    <Button className='login-button' variant="primary" onClick={handleClickSignUp}>Sign Up</Button>
                </div>

            </div>
        </>
    )
}

export default Login