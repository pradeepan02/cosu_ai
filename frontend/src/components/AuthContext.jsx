import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authMessage, setAuthMessage] = useState(null);

    const handleAuthentication = (status, message) => {
        setIsAuthenticated(status);
        if (message) {
            setAuthMessage(message); // Set the message when authenticated
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authMessage, setAuthMessage, handleAuthentication }}>
            {children}
        </AuthContext.Provider>
    );
};
