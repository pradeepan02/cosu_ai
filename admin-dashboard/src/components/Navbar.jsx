import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav>
            <h1>Admin Dashboard</h1>
            <ul className={isMenuOpen ? 'open' : ''}>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/messages">Messages</Link>
                </li>
            </ul>
            <button className="menuToggle" onClick={toggleMenu}>
                &#9776;
            </button>
        </nav>
    );
};

export default Navbar;
