// Template8.jsx
import React from 'react';
import jsPDF from 'jspdf';
import './Template8.css'; // Ensure Template8.css contains necessary styles

const Template8 = ({ formData = {} }) => {
    const defaultData = {
        PersonalDetails: {
            Name: 'John Doe',
            Email: 'johndoe@example.com',
            PhoneNumber: '+123456789',
            GitHub: 'https://github.com/johndoe',
            LinkedIn: 'https://linkedin.com/in/johndoe'
        },
        CareerLevel: 'Software Engineer',
        CareerObjective: "Driven software engineer with a passion for developing scalable web applications.",
        Education: [
            { Degree: 'B.Sc in Computer Science', Institution: 'University of Example', Year: '2018', Results: 'First Class' }
        ],
        Skills: {
            ProgrammingLanguages: ['JavaScript', 'Python', 'Java'],
            WebTechnologies: ['React', 'Node.js', 'HTML', 'CSS'],
            ToolsandFrameworks: ['Docker', 'AWS', 'Git'],
            Databases: ['MongoDB', 'SQL']
        },
        Experience: [
            {
                Position: 'Software Developer',
                Company: 'Tech Solutions Inc.',
                Dates: '2019 - Present',
                Location: 'Remote',
                Description: 'Worked on multiple projects, enhancing front-end and back-end systems.'
            }
        ],
        Projects: [
            { ProjectName: 'E-commerce Platform', Description: 'Developed a scalable platform with React and Node.js.' }
        ],
        Certifications: ['AWS Certified Developer', 'Certified Java Programmer'],
        Languages: ['English', 'Spanish'],
        Hobbies: ['Reading', 'Hiking'],
        Achievements: ['Built a project with 10k+ users', 'Published 3 tech articles'],
        AreasOfInterest: ['Artificial Intelligence', 'Cloud Computing'],
        LeadershipQualities: ['Led a team of 5', 'Organized internal tech talks']
    };

    const combinedData = { ...defaultData, ...formData };

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        const content = document.getElementById('resume-template-8');

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

    const renderExperienceSection = (experience) => {
        if (!experience || experience.length === 0) return null;

        return (
            <div className="section">
                <div className="section-heading">Experience</div>
                {experience.map((exp, index) => (
                    <div key={index} className="experience-entry">
                        <h4>{exp.Position} at {exp.Company}</h4>
                        <p>{exp.Dates}</p>
                        <p>{exp.Location}</p>
                        <p>{exp.Description}</p>
                    </div>
                ))}
            </div>
        );
    };

    const renderProjectsSection = (projects) => {
        if (!projects || projects.length === 0) return null;

        return (
            <div className="section">
                <div className="section-heading">Projects</div>
                {projects.map((project, index) => (
                    <div key={index} className="project-entry">
                        <h4>{project.ProjectName}</h4>
                        <p>{project.Description}</p>
                    </div>
                ))}
            </div>
        );
    };

    const safeJoin = (array) => {
        return Array.isArray(array) && array.length > 0 ? array.join(', ') : '';
    };

    return (
        <div className="resume-container">
            <div id="resume-template-8" className="container">
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
                {renderSection('Education', combinedData.Education.map(edu => `${edu.Degree} from ${edu.Institution}, ${edu.Results} (${edu.Year})`))}
                {renderSection('Skills', [
                    { 'Programming Languages': safeJoin(combinedData.Skills.ProgrammingLanguages) },
                    { 'Web Technologies': safeJoin(combinedData.Skills.WebTechnologies) },
                    { 'Tools and Frameworks': safeJoin(combinedData.Skills.ToolsandFrameworks) },
                    { 'Databases': safeJoin(combinedData.Skills.Databases) }
                ])}
                {renderExperienceSection(combinedData.Experience)}
                {renderProjectsSection(combinedData.Projects)}
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

export default Template8;
