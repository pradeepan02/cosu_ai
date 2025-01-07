import React, { useContext, useState } from 'react';
import styles from './CoverLetterPage.module.css';
import Layout from './Layout';
import { AuthContext } from './AuthContext';

function CoverLetterPage() {
    const { isAuthenticated, setAuthMessage, authMessage } = useContext(AuthContext);
    const [coverLetter, setCoverLetter] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [applicantName, setApplicantName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleGenerateCoverLetter = async () => {
        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('applicantName', applicantName);
        formData.append('companyName', companyName);
        formData.append('position', position);
        formData.append('companyAddress', companyAddress);

        if (isAuthenticated) {
            try {
                const response = await fetch('https://cosu-ai-flask.onrender.com/generate_cover_letter', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                setCoverLetter(data.coverLetter);
            } catch (error) {
                console.error('Error generating the cover letter!', error);
            }
        } else {
            setAuthMessage("Please sign in to generate a cover letter.");
            toggleModal();
        }
    };

    return (
        <Layout>
            <div id="pageContainer" className={styles.pageContainer}>
                <h1 id="pageTitle" className={styles.pageTitle}>Cover Letter Generator</h1>
                <div id="splitContainer" className={styles.splitContainer}>
                    <div id="inputContainer" className={styles.inputContainer}>
                        <h2>Generate Cover Letter</h2>
                        <form>
                            <label htmlFor="resume">Resume File</label>
                            <input type="file" id="resume" onChange={(e) => setResumeFile(e.target.files[0])} />

                            <label htmlFor="applicantName">Applicant Name</label>
                            <input
                                type="text"
                                id="applicantName"
                                value={applicantName}
                                onChange={(e) => setApplicantName(e.target.value)}
                                placeholder="Enter your name"
                            />

                            <label htmlFor="companyName">Company Name</label>
                            <input
                                type="text"
                                id="companyName"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Enter the company name"
                            />

                            <label htmlFor="position">Position</label>
                            <input
                                type="text"
                                id="position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="Enter the position title"
                            />

                            <label htmlFor="companyAddress">Company Address (optional)</label>
                            <input
                                type="text"
                                id="companyAddress"
                                value={companyAddress}
                                onChange={(e) => setCompanyAddress(e.target.value)}
                                placeholder="Enter the company address"
                            />

                            <button type="button" className={styles.button} onClick={handleGenerateCoverLetter}>
                                Generate Cover Letter
                            </button>
                        </form>
                    </div>
                    <div
                        id="coverLetterContainer"
                        className={styles.coverLetterContainer}
                        style={{ opacity: coverLetter ? 1 : 0 }}
                    >
                        {coverLetter && (
                            <>
                                <h3>Generated Cover Letter:</h3>
                                <p>{coverLetter}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CoverLetterPage;
