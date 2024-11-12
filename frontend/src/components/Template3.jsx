// Template3.jsx
import React from 'react';
import jsPDF from 'jspdf';
import './Template3.css';

const Template3 = ({ formData = {} }) => {
    const defaultData = {
        PersonalDetails: {
            Name: 'Jane Doe',
            Email: 'jane.doe@example.com',
            PhoneNumber: '+1234567890',
            GitHub: 'https://github.com/janedoe',
            LinkedIn: 'https://linkedin.com/in/janedoe'
        },
        CareerLevel: "Senior Software Engineer",
        CareerObjective: "Passionate software engineer with a focus on developing scalable applications.",
        Education: [
            { Institution: "University of Example", Year: "2019", Degree: "B.Sc. in Computer Science", Results: "3.9 GPA" },
            { Institution: "Example High School", Year: "2015", Degree: "High School Diploma", Results: "4.0 GPA" }
        ],
        Skills: {
            ProgrammingLanguages: ["JavaScript", "Python", "C++"],
            WebTechnologies: ["React", "HTML", "CSS", "Node.js"],
            ToolsandFrameworks: ["Git", "Docker", "AWS"],
            Databases: ["PostgreSQL", "MongoDB"]
        },
        Experience: [
            { Company: "Tech Corp", Role: "Frontend Developer", Duration: "2020 - Present", Description: "Developed front-end for e-commerce site with React." }
        ],
        Projects: [
            { Title: "Personal Blog", Description: "A blog website created using Gatsby and GraphQL." }
        ],
        Certifications: ["Certified Python Developer", "Azure Fundamentals"],
        Languages: ["English", "French"],
        Hobbies: ["Photography", "Traveling"],
        Achievements: ["Best Developer Award 2021", "Hackathon Winner"],
        AreasOfInterest: ["AI and Machine Learning", "Cloud Computing"],
        LeadershipQualities: ["Mentored Interns", "Team Lead for Product Team"]
    };

    const combinedData = { ...defaultData, ...formData };

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        const content = document.getElementById('resume-template-3');

        pdf.html(content, {
            callback: (pdf) => {
                pdf.save(`${combinedData.PersonalDetails?.Name || 'resume'}.pdf`);
            },
            margin: [20, 20, 20, 20],
            autoPaging: true,
            html2canvas: { scale: 0.6 },
            x: 20,
            y: 20
        });
    };

    const renderSection = (title, content) => {
        if (!content || content.length === 0) return null;

        return (
            <div className="section">
                <div className="section-heading">{title}</div>
                {Array.isArray(content) ? (
                    content.map((item, index) => (
                        <p key={index} className="section-paragraph">
                            {typeof item === 'string' ? item : JSON.stringify(item)}
                        </p>
                    ))
                ) : (
                    <p className="section-paragraph">{content}</p>
                )}
            </div>
        );
    };

    const safeJoin = (array) => {
        return Array.isArray(array) && array.length > 0 ? array.join(', ') : '';
    };

    return (
        <div className="resume-container">
            <div id="resume-template-3" className="container">
                <div className="header">
                    <div className="contact-info">
                        {combinedData.PersonalDetails?.Name && <p className="name">{combinedData.PersonalDetails.Name}</p>}
                        {combinedData.CareerLevel && <p className="details">{combinedData.CareerLevel}</p>}
                        {combinedData.PersonalDetails?.Email && (
                            <p>Email: <a href={`mailto:${combinedData.PersonalDetails.Email}`} className="link">{combinedData.PersonalDetails.Email}</a></p>
                        )}
                        {combinedData.PersonalDetails?.PhoneNumber && <p>Phone: {combinedData.PersonalDetails.PhoneNumber}</p>}
                        {combinedData.PersonalDetails?.GitHub && (
                            <p>GitHub: <a href={combinedData.PersonalDetails.GitHub} className="link">{combinedData.PersonalDetails.GitHub}</a></p>
                        )}
                        {combinedData.PersonalDetails?.LinkedIn && (
                            <p>LinkedIn: <a href={combinedData.PersonalDetails.LinkedIn} className="link">{combinedData.PersonalDetails.LinkedIn}</a></p>
                        )}
                    </div>
                </div>

                <div className="resume-divider"></div>

                {renderSection('Career Objective', combinedData.CareerObjective)}
                {renderSection('Education', combinedData.Education)}
                {renderSection('Skills', [
                    { 'Programming Languages': safeJoin(combinedData.Skills.ProgrammingLanguages) },
                    { 'Web Technologies': safeJoin(combinedData.Skills.WebTechnologies) },
                    { 'Tools and Frameworks': safeJoin(combinedData.Skills.ToolsandFrameworks) },
                    { 'Databases': safeJoin(combinedData.Skills.Databases) }
                ])}
                {renderSection('Experience', combinedData.Experience)}
                {renderSection('Projects', combinedData.Projects)}
                {renderSection('Certifications', combinedData.Certifications)}
                {renderSection('Languages', combinedData.Languages)}
                {renderSection('Hobbies', combinedData.Hobbies)}
                {renderSection('Achievements', combinedData.Achievements)}
                {renderSection('Areas of Interest', combinedData.AreasOfInterest)}
                {renderSection('Leadership Qualities', combinedData.LeadershipQualities)}

                <button className="pdf-download-button" onClick={generatePDF}>Download as PDF</button>
            </div>
        </div>
    );
};

export default Template3;
