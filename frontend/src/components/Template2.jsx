// Template2.jsx
import React from 'react';
import jsPDF from 'jspdf';
import './Template2.css';

const Template2 = ({ formData = {} }) => {
    const defaultData = {
        PersonalDetails: {
            Name: 'John Doe',
            Email: 'john.doe@example.com',
            PhoneNumber: '+1234567890',
            GitHub: 'https://github.com/johndoe',
            LinkedIn: 'https://linkedin.com/in/johndoe'
        },
        CareerObjective: "Aspiring software engineer with a passion for developing innovative solutions.",
        Education: [
            { Institution: "University of Example", Year: "2020", Degree: "B.Sc. in Computer Science", Results: "3.8 GPA" },
            { Institution: "Example High School", Year: "2016", Degree: "High School Diploma", Results: "4.0 GPA" }
        ],
        Skills: {
            ProgrammingLanguages: ["JavaScript", "Python", "Java"],
            WebTechnologies: ["React", "HTML", "CSS"],
            ToolsandFrameworks: ["Node.js", "Express", "Git"],
            Databases: ["MySQL", "MongoDB"]
        },
        Experience: [
            { Company: "Example Corp", Role: "Software Developer", Duration: "2021 - Present", Description: "Developing web applications and APIs." }
        ],
        Projects: [
            { Title: "Portfolio Website", Description: "Personal portfolio built using React and hosted on GitHub Pages." }
        ],
        Certifications: ["Certified JavaScript Developer", "AWS Certified Solutions Architect"],
        Languages: ["English", "Spanish"],
        Hobbies: ["Reading", "Hiking", "Photography"],
        Achievements: ["Top Scorer in Coding Competition", "Volunteer of the Year"],
        AreasOfInterest: ["Machine Learning", "Cybersecurity"],
        LeadershipQualities: ["Team Lead at Example Corp", "Mentored junior developers"]
    };

    const combinedData = { ...defaultData, ...formData };

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        const content = document.getElementById('resume-template-2');

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

        if (title === 'Education') {
            return (
                <div className="section">
                    <div className="section-heading">{title}</div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Institution</th>
                                    <th>Year</th>
                                    <th>Degree</th>
                                    <th>Results</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Institution}</td>
                                        <td>{item.Year}</td>
                                        <td>{item.Degree}</td>
                                        <td>{item.Results}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else if (
            title === 'Certifications' ||
            title === 'Languages' ||
            title === 'Hobbies' ||
            title === 'Areas of Interest' ||
            title === 'Achievements' ||
            title === 'Leadership Qualities'
        ) {
            return (
                <div className="section">
                    <div className="section-heading">{title}</div>
                    <ul>
                        {content.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="section">
                    <div className="section-heading">{title}</div>
                    {content.map((item, index) => (
                        <div key={index}>
                            {Object.entries(item).map(([key, value]) => (
                                typeof value === 'object' ? (
                                    Object.entries(value).map(([nestedKey, nestedValue]) => (
                                        nestedValue ? (
                                            <p key={nestedKey}><strong>{nestedKey}:</strong> {nestedValue}</p>
                                        ) : null
                                    ))
                                ) : value ? (
                                    <p key={key}><strong>{key}:</strong> {value}</p>
                                ) : null
                            ))}
                        </div>
                    ))}
                </div>
            );
        }
    };

    const safeJoin = (array) => {
        return Array.isArray(array) && array.length > 0 ? array.join(', ') : '';
    };

    const renderResume = () => {
        return (
            <>
                {combinedData.CareerObjective && (
                    <div className="section">
                        <div className="section-heading">Career Objective</div>
                        <p>{combinedData.CareerObjective}</p>
                    </div>
                )}
                {renderSection('Education', combinedData.Education)}
                {renderSection('Skills', [
                    { 'Programming Languages': safeJoin(combinedData.Skills.ProgrammingLanguages) },
                    { 'Web Technologies': safeJoin(combinedData.Skills.WebTechnologies) },
                    { 'Tools and Frameworks': safeJoin(combinedData.Skills.ToolsandFrameworks) },
                    { 'Databases': safeJoin(combinedData.Skills.Databases) },
                ])}
                {renderSection('Experience', combinedData.Experience)}
                {renderSection('Projects', combinedData.Projects)}
                {renderSection('Certifications', combinedData.Certifications)}
                {renderSection('Languages', combinedData.Languages)}
                {renderSection('Hobbies', combinedData.Hobbies)}
                {renderSection('Achievements', combinedData.Achievements)}
                {renderSection('Areas of Interest', combinedData.AreasOfInterest)}
                {renderSection('Leadership Qualities', combinedData.LeadershipQualities)}
            </>
        );
    };

    return (
        <div className="resume-container">
            <div id="resume-template-2">
                <div className="header">
                    <div className="contact-info">
                        {combinedData.PersonalDetails?.Name && (
                            <p className="name">{combinedData.PersonalDetails.Name}</p>
                        )}
                        {combinedData.PersonalDetails?.Email && (
                            <p>Email: <a href={`mailto:${combinedData.PersonalDetails.Email}`}>{combinedData.PersonalDetails.Email}</a></p>
                        )}
                        {combinedData.PersonalDetails?.PhoneNumber && (
                            <p>Phone: {combinedData.PersonalDetails.PhoneNumber}</p>
                        )}
                        {combinedData.PersonalDetails?.GitHub && (
                            <p>GitHub: <a href={combinedData.PersonalDetails.GitHub} target="_blank" rel="noopener noreferrer">{combinedData.PersonalDetails.GitHub}</a></p>
                        )}
                        {combinedData.PersonalDetails?.LinkedIn && (
                            <p>LinkedIn: <a href={combinedData.PersonalDetails.LinkedIn} target="_blank" rel="noopener noreferrer">{combinedData.PersonalDetails.LinkedIn}</a></p>
                        )}
                    </div>
                </div>

                <div className="resume-divider"></div>

                {renderResume()}
            </div>

            <button className="pdf-download-button" onClick={generatePDF}>Download as PDF</button>
        </div>
    );
};

export default Template2;
