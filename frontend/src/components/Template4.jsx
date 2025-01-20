// Template4.jsx
import React from 'react';
import jsPDF from 'jspdf';
import './Template4.css';

const Template4 = ({ formData = {} }) => {
    const defaultData = {
        PersonalDetails: {
            Name: 'John Doe',
            Email: 'john.doe@example.com',
            Phone: '+1234567890',
            LinkedIn: 'https://linkedin.com/in/johndoe',
            GitHub: 'https://github.com/johndoe'
        },
        CareerLevel: 'Software Developer',
        CareerObjective: "A dedicated software developer with a passion for creating efficient and scalable applications.",
        Education: [
            { Institution: 'Sample University', Year: '2020', Degree: 'B.Sc. in Computer Science', Results: '3.8 GPA' },
            { Institution: 'Sample High School', Year: '2016', Degree: 'High School Diploma', Results: '4.0 GPA' }
        ],
        Skills: {
            ProgrammingLanguages: ['JavaScript', 'Python', 'Java'],
            WebTechnologies: ['React', 'HTML', 'CSS'],
            ToolsandFrameworks: ['Git', 'Docker'],
            Databases: ['MySQL', 'MongoDB']
        },
        Experience: [
            { Company: 'Tech Solutions', Role: 'Frontend Developer', Duration: '2021 - Present', Description: 'Developed user interfaces using React and Redux.' }
        ],
        Projects: [
            { Title: 'Weather App', Description: 'A weather forecasting app built with React and OpenWeather API.' }
        ],
        Certifications: ['AWS Certified Solutions Architect', 'Certified ScrumMaster'],
        Languages: ['English', 'Spanish'],
        Achievements: ['Employee of the Month - June 2022', 'Won First Place in Company Hackathon'],
        AreasOfInterest: ['Machine Learning', 'Cloud Computing'],
        LeadershipQualities: ['Mentored junior developers', 'Led project teams in collaborative efforts']
    };

    const combinedData = { ...defaultData, ...formData };

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        const content = document.getElementById('resume-template-4');
        
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
                    <div className="sectionHeading">{title}</div>
                    <div className="tableContainer">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="tableHeader">Institution</th>
                                    <th className="tableHeader">Year</th>
                                    <th className="tableHeader">Degree</th>
                                    <th className="tableHeader">Results</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'rowEven' : ''}>
                                        <td className="tableCell">{item.Institution}</td>
                                        <td className="tableCell">{item.Year}</td>
                                        <td className="tableCell">{item.Degree}</td>
                                        <td className="tableCell">{item.Results}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else if (['Certifications', 'Languages', 'Hobbies', 'Areas of Interest', 'Achievements', 'Leadership Qualities'].includes(title)) {
            return (
                <div className="section">
                    <div className="sectionHeading">{title}</div>
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
                    <div className="sectionHeading">{title}</div>
                    {content.map((item, index) => (
                        <div key={index}>
                            {Object.entries(item).map(([key, value]) =>
                                typeof value === 'object' ? (
                                    Object.entries(value).map(([nestedKey, nestedValue]) =>
                                        nestedValue ? (
                                            <p key={nestedKey}>
                                                <strong>{nestedKey}:</strong> {nestedValue}
                                            </p>
                                        ) : null
                                    )
                                ) : value ? (
                                    <p key={key}>
                                        <strong>{key}:</strong> {value}
                                    </p>
                                ) : null
                            )}
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
        const { CareerLevel } = combinedData;

        if (CareerLevel) {
            return (
                <>
                    {combinedData.CareerObjective && (
                        <div className="section career-objective">
                            <div className="sectionHeading">Career Objective</div>
                            <p>{combinedData.CareerObjective}</p>
                        </div>
                    )}
                    {renderSection('Education', combinedData.Education)}
                    {renderSection('Skills', [
                        { 'Programming Languages': safeJoin(combinedData.Skills?.ProgrammingLanguages) },
                        { 'Web Technologies': safeJoin(combinedData.Skills?.WebTechnologies) },
                        { 'Tools and Frameworks': safeJoin(combinedData.Skills?.ToolsandFrameworks) },
                        { 'Databases': safeJoin(combinedData.Skills?.Databases) },
                    ])}
                    {renderSection('Experience', combinedData.Experience)}
                    {renderSection('Projects', combinedData.Projects)}
                    {renderSection('Certifications', combinedData.Certifications)}
                    {renderSection('Languages', combinedData.Languages)}
                    {renderSection('Achievements', combinedData.Achievements)}
                    {renderSection('Areas of Interest', combinedData.AreasOfInterest)}
                    {renderSection('Leadership Qualities', combinedData.LeadershipQualities)}
                </>
            );
        } else {
            return <p>Career Level not specified</p>;
        }
    };

    return (
        <div className="resume-container">
            <div id="resume-template-4" className="container">
                <div className="header">
                    <h1 className="name">{combinedData.PersonalDetails?.Name || 'Your Name'}</h1>
                    <div className="contactInfo">
                        <p>{combinedData.PersonalDetails?.Email || 'email@example.com'}</p>
                        <p>{combinedData.PersonalDetails?.Phone || '+1234567890'}</p>
                        <p>{combinedData.PersonalDetails?.LinkedIn ? <a className="link" href={combinedData.PersonalDetails.LinkedIn}>LinkedIn</a> : null}</p>
                        <p>{combinedData.PersonalDetails?.GitHub ? <a className="link" href={combinedData.PersonalDetails.GitHub}>GitHub</a> : null}</p>
                    </div>
                </div>
                <div className="resumeDivider"></div>
                {renderResume()}
                <button className="pdfDownloadButton" onClick={generatePDF}>Download PDF</button>
            </div>
        </div>
    );
};

export default Template4;
