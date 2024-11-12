import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';
import styles from './Layout.module.css';
import { AuthContext } from './AuthContext';

const Layout = ({ children }) => {
    const { authMessage, setAuthMessage } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setAuthMessage(null); // Clear auth message when modal is opened
    };

    return (
        <div className={styles.layout}>
            <nav className={styles.navbar}>
                <ul className={styles.navList}>
                    <li onClick={() => navigate('/')}>Home</li>
                    <li onClick={() => navigate('/template-selector')}>Templates</li>
                    <li onClick={() => navigate('/coverLetter')}>Cover Letter</li>
                    <li onClick={() => navigate('/contact')}>Contact Us</li>
                    <li onClick={toggleModal}>Sign In / Sign Up</li>
                </ul>
            </nav>
            <main className={styles.mainContent}>
                {children}
            </main>
            <AuthModal isOpen={isModalOpen} onClose={toggleModal} />
            {authMessage && <p className={styles.authMessage}>{authMessage}</p>} {/* Display authMessage only when not in modal */}
        </div>
    );
};

export default Layout;
