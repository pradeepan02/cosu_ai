// Template9.jsx
import React from 'react';
import jsPDF from 'jspdf';
import './Template9.css'; // Ensure Template9.css contains necessary styles

const Template9 = ({ formData = {} }) => {
    const defaultData = {
        PersonalDetails: {
            Name: 'Jane Smith',
            Email: 'janesmith@example.com',
            PhoneNumber: '+1234567890',
            GitHub: 'https://github.com/janesmith',
            LinkedIn: 'https://linkedin.com/in/janesmith'
        },
        CareerLevel: 'Senior Software Engineer',
        ProfessionalSummary: "Experienced software engineer with expertise in full-stack development and cloud solutions.",
        Skills: {
            ProgrammingLanguages: ['Python', 'JavaScript', 'C++'],
            WebTechnologies: ['React', 'Angular', 'Node.js'],
            ToolsandFrameworks: ['Docker', 'Kubernetes', 'Jenkins'],
            Databases: ['PostgreSQL', 'MongoDB']
        },
        Experience: [
            {
                Position: 'Lead Developer',
                Company: 'Innovative Solutions',
                Dates: '2020 - Present',
                Location: 'Remote',
                Description: 'Led the development team to build scalable applications.'
            }
        ],
        Education: [
            { Degree: 'M.Sc. in Computer Science', Institution: 'University of Tech', Year: '2018' }
        ],
        Certifications: ['Certified Kubernetes Administrator', 'AWS Solutions Architect'],
        Projects: [
            { ProjectName: 'Inventory Management System', Description: 'Developed an enterprise-level inventory system.' }
        ],
        Languages: ['English', 'French'],
        Hobbies: ['Photography', 'Traveling'],
        Achievements: ['Presented at international tech conferences', 'Published in industry journals'],
        AreasOfInterest: ['AI and Machine Learning', 'Cybersecurity'],
        LeadershipQualities: ['Mentored junior developers', 'Organized technical workshops']
    };

    const combinedData = { ...defaultData, ...formData };

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        });

        const content = document.getElementById('resume-template-9');

        pdf.html(content, {
            callback: (pdf) => {
                pdf.save(`${combinedData.PersonalDetails?.Name || 'resume'}.pdf`);
            },
            margin: [20, 20, 20, 20],
            autoPaging: true,
            html2canvas: { scale: 0.6 },
            x: 20,
            y: 20,
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
        return Array.isArray(array) && array.length > 0 ? array.join(', ') : 'None listed.';
    };

    return (
        <div className="resume-container">
            <div id="resume-template-9" className="container">
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

                {renderSection('Professional Summary', combinedData.ProfessionalSummary)}
                {renderSection('Skills', [
                    { 'Programming Languages': safeJoin(combinedData.Skills?.ProgrammingLanguages) },
                    { 'Web Technologies': safeJoin(combinedData.Skills?.WebTechnologies) },
                    { 'Tools and Frameworks': safeJoin(combinedData.Skills?.ToolsandFrameworks) },
                    { 'Databases': safeJoin(combinedData.Skills?.Databases) }
                ])}
                {renderSection('Experience', combinedData.Experience?.map((exp, index) => (
                    `${exp.Position} at ${exp.Company} (${exp.Dates}) - ${exp.Location}: ${exp.Description}`
                )))}
                {renderSection('Education', combinedData.Education?.map((edu, index) => (
                    `${edu.Degree} from ${edu.Institution} (${edu.Year})`
                )))}
                {renderSection('Certifications', combinedData.Certifications)}
                {renderSection('Projects', combinedData.Projects?.map((proj, index) => `${proj.ProjectName} - ${proj.Description}`))}
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

export default Template9;
