// Template6.jsx
import React from 'react';
import jsPDF from 'jspdf';
import './Template6.css';

const Template6 = ({ formData = {} }) => {
    // Default sample data for preview
    const defaultData = {
        PersonalDetails: {
            Name: 'John Doe',
            Email: 'john.doe@example.com',
            PhoneNumber: '+1234567890',
            GitHub: 'https://github.com/johndoe',
            LinkedIn: 'https://linkedin.com/in/johndoe'
        },
        CareerLevel: 'Full Stack Developer',
        CareerObjective: "Dedicated software developer with experience in creating robust web applications and a passion for coding.",
        Education: [
            { Degree: 'B.Tech in Computer Science', Institution: 'Tech University', Year: '2019', Results: 'First Class Honours' },
            { Degree: 'High School Diploma', Institution: 'XYZ High School', Year: '2015', Results: '4.0 GPA' }
        ],
        Skills: {
            ProgrammingLanguages: ['JavaScript', 'Python', 'C++'],
            WebTechnologies: ['React', 'Node.js', 'CSS'],
            ToolsandFrameworks: ['Git', 'Docker', 'Kubernetes'],
            Databases: ['PostgreSQL', 'MongoDB']
        },
        Experience: [
            { Position: 'Software Engineer', Company: 'Innovatech', Dates: '2019 - Present', Location: 'Remote', Description: 'Developed scalable web applications' }
        ],
        Projects: [
            { ProjectName: 'Portfolio Website', Description: 'Personal portfolio website showcasing my projects' }
        ],
        Certifications: ['AWS Certified Developer', 'Google Cloud Certified'],
        Languages: ['English', 'French'],
        Hobbies: ['Coding', 'Hiking', 'Photography'],
        Achievements: ['Published article in Tech Journal', 'Hackathon Winner'],
        AreasOfInterest: ['Artificial Intelligence', 'Blockchain'],
        LeadershipQualities: ['Team Lead in multiple projects', 'Organized coding workshops']
    };

    // Combine formData with defaultData for preview
    const combinedData = { ...defaultData, ...formData };

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        const content = document.getElementById('resume-template-6');

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
        if (!content || (Array.isArray(content) && content.length === 0)) return null;

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
            <div id="resume-template-6" className="container">
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
                {renderSection('Education', combinedData.Education?.map((edu) => `${edu.Degree} from ${edu.Institution}, ${edu.Results} (${edu.Year})`))}
                {renderSection('Skills', [
                    { 'Programming Languages': safeJoin(combinedData.Skills?.ProgrammingLanguages) },
                    { 'Web Technologies': safeJoin(combinedData.Skills?.WebTechnologies) },
                    { 'Tools and Frameworks': safeJoin(combinedData.Skills?.ToolsandFrameworks) },
                    { 'Databases': safeJoin(combinedData.Skills?.Databases) }
                ])}
                {renderSection('Experience', combinedData.Experience?.map((exp) => (
                    `${exp.Position} at ${exp.Company} (${exp.Dates}) - ${exp.Location}: ${exp.Description}`
                )))}
                {renderSection('Projects', combinedData.Projects?.map((proj) => `${proj.ProjectName} - ${proj.Description}`))}
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

export default Template6;
