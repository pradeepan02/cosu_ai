import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Messages from './components/Messages';
import './App.css'; // Add global styles for better layout control

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="contentContainer">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/messages" element={<Messages />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
