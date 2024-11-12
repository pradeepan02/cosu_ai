import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importing the CSS file

const Navbar = () => {
    return (
        <nav>
            <h1>Admin Dashboard</h1>
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/messages">Messages</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
