// TemplateSelector.js
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Template2Image from '../components/images/google.png';
import Template3Image from '../components/images/amzon.png';
import Template4Image from '../components/images/zoho.png';
import Template5Image from '../components/images/infosys.png';
import Template6Image from '../components/images/tcs.png';
import Template7Image from '../components/images/wipro.png';
import Template8Image from '../components/images/apple.png';
import Template9Image from '../components/images/cts.png';
import './TemplateSelector.css';
import Layout from './Layout';

const TemplateSelector = () => {
    const location = useLocation();
    const { formData } = location.state || {};
    const [loading, setLoading] = useState(false);

    const handleTemplateClick = () => {
        setLoading(true);
        // Simulate loading time (e.g., API call or navigation delay)
        setTimeout(() => {
            setLoading(false); // Set loading to false after the simulated delay
            // You can also navigate to the selected template here if needed
        }, 2000); // Adjust time as necessary
    };

    return (
        <Layout>
        <div className="template-selector-container">
            <h1 className="title">Select a Resume Template</h1>
            <div className="template-items">
                <div className="template-item" onClick={handleTemplateClick}>
                    <Link to="/resume-builder/template2" state={{ formData }}>
                        <img src={Template2Image} alt="Template 2" />
                        <p>Google Template</p>
                    </Link>
                </div>
                <div className="template-item" onClick={handleTemplateClick}>
                    <Link to="/resume-builder/template3" state={{ formData }}>
                        <img src={Template3Image} alt="Template 3" />
                        <p>Amazon Template</p>
                    </Link>
                </div>
                <div className="template-item" onClick={handleTemplateClick}>
                    <Link to="/resume-builder/template4" state={{ formData }}>
                        <img src={Template4Image} alt="Template 4" />
                        <p>Zoho Template</p>
                    </Link>
                </div>
                <div className="template-item" onClick={handleTemplateClick}>
                    <Link to="/resume-builder/template5" state={{ formData }}>
                        <img src={Template5Image} alt="Template 5" />
                        <p>Infosys Template</p>
                    </Link>
                </div>
                <div className="template-item" onClick={handleTemplateClick}>
                    <Link to="/resume-builder/template6" state={{ formData }}>
                        <img src={Template6Image} alt="Template 6" />
                        <p>TCS Template</p>
                    </Link>
                </div>
                <div className="template-item" onClick={handleTemplateClick}>
                    <Link to="/resume-builder/template7" state={{ formData }}>
                        <img src={Template7Image} alt="Template 7" />
                        <p>Wipro Template</p>
                    </Link>
                </div>
                <div className="template-item" onClick={handleTemplateClick}>
                    <Link to="/resume-builder/template8" state={{ formData }}>
                        <img src={Template8Image} alt="Template 8" />
                        <p>Apple Template</p>
                    </Link>
                </div>
                <div className="template-item" onClick={handleTemplateClick}>
                    <Link to="/resume-builder/template9" state={{ formData }}>
                        <img src={Template9Image} alt="Template 9" />
                        <p>CTS Template</p>
                    </Link>
                </div>
            </div>

            {/* Loading Overlay */}
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Building The Resume ....</p>
                </div>
            )}
        </div>
        </Layout>
    );
};

export default TemplateSelector;
