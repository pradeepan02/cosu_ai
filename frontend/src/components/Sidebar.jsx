import React from 'react';
import './Sidebar.css';

const Sidebar = ({ currentStep, totalSteps }) => {
    const steps = [
        "Personal Details",
        "Career Objectives and Level",
        "Skills",
        "Education Details and Projects",
        "Experience",
        "Achievements and Certifications"
    ];

    return (
        <div className="displayPage">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Resume Builder</h2>
                </div>
                <div className="sidebar-steps">
                    {steps.map((step, index) => (
                        <div key={index} className={`step-item ${currentStep >= index + 1 ? 'completed' : ''}`}>
                            <div className={`step-circle ${currentStep === index + 1 ? 'active' : ''}`}>
                                {currentStep > index + 1 ? (
                                    <span className="check-mark">&#10003;</span>
                                ) : (
                                    <span>{index + 1}</span>
                                )}
                            </div>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>
                <div className="sidebar-progress">
                    <p>RESUME COMPLETENESS:</p>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
                    </div>
                    <p>{Math.round((currentStep / totalSteps) * 100)}%</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
