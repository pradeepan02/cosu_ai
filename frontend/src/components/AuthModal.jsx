import React, { useState, useContext, useEffect } from 'react';
import styles from './AuthModal.module.css';
import { AuthContext } from './AuthContext';

function AuthModal({ isOpen, onClose }) {
    const { handleAuthentication, authMessage, setAuthMessage } = useContext(AuthContext);
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authMessage) {
            setError(authMessage);
            setAuthMessage(null);
        }
    }, [authMessage, setAuthMessage]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isSignIn ? "/signin" : "/signup";
        const requestData = isSignIn
            ? { email: formData.email, password: formData.password }
            : { username: formData.username, email: formData.email, password: formData.password };

        try {
            const response = await fetch(`https://cosu-ai.onrender.com${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || "Something went wrong");
            }

            handleAuthentication(true, data.message);
            alert(data.message);
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleMode = () => {
        setIsSignIn(!isSignIn);
        setError(null);
        setFormData({ username: '', email: '', password: '' });
    };

    return (
        <div id="modalOverlay" className={styles.modalOverlay} onClick={onClose}>
            <div id="modalContent" className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
                {error && <p id="errorText" className={styles.errorText}>{error}</p>}
                <form id="authForm" className={styles.authForm} onSubmit={handleSubmit}>
                    {!isSignIn && (
                        <div>
                            <label id="label" htmlFor="username" className={styles.label}>Full Name</label>
                            <input
                                id="inputField"
                                type="text"
                                name="username"
                                required
                                className={styles.inputField}
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    )}
                    <div>
                        <label id="label" htmlFor="email" className={styles.label}>Email</label>
                        <input
                            id="inputField"
                            type="email"
                            name="email"
                            required
                            className={styles.inputField}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label id="label" htmlFor="password" className={styles.label}>Password</label>
                        <input
                            id="inputField"
                            type="password"
                            name="password"
                            required
                            className={styles.inputField}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button id="submitButton" type="submit" className={styles.submitButton}>
                        {isSignIn ? "Sign In" : "Sign Up"}
                    </button>
                    <p id="toggleLink" onClick={toggleMode} className={styles.toggleLink}>
                        {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </p>
                </form>
            </div>
        </div>
    );
}

export default AuthModal;
