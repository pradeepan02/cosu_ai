import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './UploadPage.module.css';
import Layout from './Layout';

function UploadPage({ setResumeData }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            console.error('No file selected!');
            return;
        }

        const data = new FormData();
        data.append('pdf_doc', file);
        setLoading(true);

        try {
            const response = await axios.post('https://cosu-ai-2.onrender.com/process', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResumeData(response.data);
            navigate('/display');
        } catch (error) {
            console.error('Error parsing the resume!', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuildFromScratch = () => {
        setResumeData({});
        navigate('/display');
    };

    return (
        <Layout>
        <div className={styles.pageContainer}>
            {loading ? (
                <div className={styles.loadingScreen}>
                    <div className={styles.spinner}></div>
                    <p>Processing your resume, please wait...</p>
                </div>
            ) : (
                <div className={styles.splitContainer}>
                    <div className={styles.uploadContainer}>
                        <h2>Upload Your Resume</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="file" onChange={handleFileChange} />
                            <div className={`${styles.box}`} onClick={handleSubmit}>
                                Upload
                            </div>
                        </form>
                    </div>
                    <div className={styles.buildContainer}>
                        <h2>Build from Scratch</h2>
                        <div className={styles.box} onClick={handleBuildFromScratch}>
                            Build Resume from Scratch
                        </div>
                    </div>
                </div>
            )}
            
        </div>
        </Layout>
    );
}

export default UploadPage;
