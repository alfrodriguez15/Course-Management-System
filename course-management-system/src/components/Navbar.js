import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../images/vt-logo.png';

function Navbar() {
    return (
        <>
            {/* First Navbar */}
            <nav className='navbar'>
                <ul className='nav-menu'>
                    {/* Home */}
                    <li className='nav-item'>
                        <Link to='/' className='nav-link'>
                            Home
                        </Link>
                    </li>
                    {/* About us */}
                    <li className='nav-item'>
                        <Link to='/aboutus' className='nav-link'>
                            About Us
                        </Link>
                    </li>
                    {/* Services */}
                    <li className='nav-item'>
                        <Link to='/services' className='nav-link'>
                            Services
                        </Link>
                    </li>
                    {/* Reviews */}
                    <li className='nav-item'>
                        <Link to='/reviews' className='nav-link'>
                            Reviews
                        </Link>
                    </li>
                    {/* Sign in */}
                    <li className='nav-item-2'>
                        <Link to='/login' className='nav-link'>
                            Login
                        </Link>
                    </li>
                </ul>
                
            </nav>
            

            {/* Second Navbar */}
            <nav className='navbar-2'>
                {/* Link to VT Homepage */}
                <a href="https://www.vt.edu/" target="_blank" rel="noopener noreferrer">
                    <img src={logo} alt="VT Logo" className="navbar-logo" /> {/* Logo */}
                </a>
            </nav>
        </>

    )
}

export default Navbar;
