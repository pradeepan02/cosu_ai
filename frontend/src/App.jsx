// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './components/UploadPage';
import DisplayPage from './components/DisplayPage';
import TemplateSelector from './components/TemplateSelector';
import ResumeBuilder from './components/ResumeBuilder';
import LandingPage from './components/LandingPage';
import ContactPage from './components/ContactPage';
import CoverLetterPage from './components/CoverLetterPage';
import { AuthProvider } from './components/AuthContext';

function App() {
    const [resumeData, setResumeData] = useState(null);

    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/upload" element={<UploadPage setResumeData={setResumeData} />} />
                <Route path="/display" element={<DisplayPage resumeData={resumeData} />} />
                <Route path="/template-selector" element={<TemplateSelector resumeData={resumeData} />} />
                <Route path="/resume-builder/:templateId" element={<ResumeBuilder />} />
                <Route path="/coverLetter" element={<CoverLetterPage />} />
            </Routes>
        </Router>
        </AuthProvider>
    );
}

export default App;
