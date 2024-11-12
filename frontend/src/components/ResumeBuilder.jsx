import React from 'react';
import { useLocation } from 'react-router-dom';
import Template2 from './Template2';
import './ResumeBuilder.css'; // Import the CSS file
import Template3 from './Template3';
import Template4 from './Template4';
import Template5 from './Template5';
import Template6 from './Template6';
import Template7 from './Template7';
import Template8 from './Template8';
import Template9 from './Template9';


const ResumeBuilder = () => {
    const location = useLocation();
    const { formData } = location.state || {};
    const templateId = location.pathname.split('/').pop();

    return (
        <div className="resume-builder-container">
            <h1 className="resume-builder-title">Resume Builder</h1>
           
            {templateId === 'template2' && <Template2 formData={formData} />}
            {templateId === 'template3' && <Template3 formData={formData} />}
            {templateId === 'template4' && <Template4 formData={formData} />}
            {templateId === 'template5' && <Template5 formData={formData} />}
            {templateId === 'template6' && <Template6 formData={formData} />}
            {templateId === 'template7' && <Template7 formData={formData} />}
            {templateId === 'template8' && <Template8 formData={formData} />}
            {templateId === 'template9' && <Template9 formData={formData} />}

        </div>
    );
};

export default ResumeBuilder;
