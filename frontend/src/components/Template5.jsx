// Template5.jsx
import React from 'react';
import jsPDF from 'jspdf';
import './Template5.css';

const Template5 = ({ formData = {} }) => {
    // Sample default data for preview
    const defaultData = {
        PersonalDetails: {
            Name: 'Jane Smith',
            Email: 'jane.smith@example.com',
            PhoneNumber: '+1234567890',
            GitHub: 'https://github.com/janesmith',
            LinkedIn: 'https://linkedin.com/in/janesmith'
        },
        CareerLevel: 'Software Engineer',
        CareerObjective: "Aspiring software engineer with a passion for developing innovative solutions and a drive for continuous learning.",
        Education: [
            { Degree: 'B.Sc. in Computer Science', Institution: 'Example University', Year: '2020', Results: 'First Class Honours' },
            { Degree: 'High School Diploma', Institution: 'Sample High School', Year: '2016', Results: '4.0 GPA' }
        ],
        Skills: {
            ProgrammingLanguages: ['JavaScript', 'Python', 'Java'],
            WebTechnologies: ['React', 'HTML', 'CSS'],
            ToolsandFrameworks: ['Git', 'Docker'],
            Databases: ['MySQL', 'MongoDB']
        },
        Experience: [
            { Position: 'Software Developer', Company: 'Tech Corp', Dates: '2021 - Present', Location: 'Remote', Description: 'Developed web applications using React and Node.js' }
        ],
        Projects: [
            { ProjectName: 'E-commerce App', Description: 'An online shopping platform built with React and Firebase' }
        ],
        Certifications: ['AWS Certified Solutions Architect', 'Certified ScrumMaster'],
        Languages: ['English', 'Spanish'],
        Hobbies: ['Photography', 'Traveling', 'Gaming'],
        Achievements: ['Dean\'s List for 3 consecutive years', 'Hackathon Winner'],
        AreasOfInterest: ['Machine Learning', 'Data Science'],
        LeadershipQualities: ['Mentored junior developers', 'Led team projects']
    };

    // Combine formData with defaultData for previewing
    const combinedData = { ...defaultData, ...formData };

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        const content = document.getElementById('resume-template-5');

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
            <div id="resume-template-5" className="container">
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

export default Template5;
