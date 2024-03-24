import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
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
                {/* Sign in */}
                <li className='nav-item'>
                    <Link to='/signin' className='nav-link'>
                        Sign In
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
