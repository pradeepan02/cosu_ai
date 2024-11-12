import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Layout from './Layout';
import { AuthContext } from './AuthContext';
import AuthModal from './AuthModal'; // Assuming you have an AuthModal component for sign-in prompts

function LandingPage() {
    const { isAuthenticated, setAuthMessage, authMessage } = useContext(AuthContext); // Add authMessage here
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleStart = () => {
        if (isAuthenticated) {
            navigate('/upload');
        } else {
            setAuthMessage("You must be signed in to get started."); // Set the message
            toggleModal(); // Open the modal
        }
    };

    return (
        <Layout>
            <div className={styles.LandingPage}>
                <div className={styles.pageContainer}>
                    {/* Hero Section */}
                    <header className={styles.hero}>
                        <h1>Welcome to CosuAI</h1>
                        <h2>AI-Powered Resumes and Cover Letters</h2>
                        <p>Craft your future with AI.</p>
                        <div className={styles.ctaContainer}>
                            <div className={styles.startButton} onClick={handleStart}>
                                Get Started
                            </div>
                        </div>
                    </header>
                    
                    {/* Features Section */}
                    <section className={styles.features}>
                        <h3>Key Features</h3>
                        <div className={styles.featureList}>
                            <div className={styles.featureItem}>
                              
                                <h4>AI-Powered Suggestions</h4>
                                <p>Get tailored suggestions to enhance your cover letters.</p>
                            </div>
                            <div className={styles.featureItem}>
                               
                                <h4>ATS-Friendly Formatting</h4>
                                <p>Ensure your documents get noticed by Applicant Tracking Systems.</p>
                            </div>
                            <div className={styles.featureItem}>
                               
                                <h4>Easy Customization</h4>
                                <p>Quickly personalize your resumes and cover letters for any job.</p>
                            </div>
                            <div className={styles.featureItem}>
                                
                                <h4>Keyword Optimization</h4>
                                <p>Utilize essential keywords to stand out in job applications.</p>
                            </div>
                        </div>
                    </section>
                
                    {/* Testimonials Section */}
                    <section className={styles.testimonials}>
                        <h3>What Our Users Say</h3>
                        <div className={styles.testimonialCarousel}>
                            <blockquote>
                                "CosuAI transformed my job applications! I landed interviews within days!"
                                <footer>- Happy User</footer>
                            </blockquote>
                            <blockquote>
                                "The AI suggestions were spot on! My cover letters have never looked better."
                                <footer>- Satisfied Customer</footer>
                            </blockquote>
                            <blockquote>
                                "Thanks to CosuAI, I finally got my dream job! Highly recommended!"
                                <footer>- Grateful Job Seeker</footer>
                            </blockquote>
                        </div>
                    </section>

                    {/* FAQs Section */}
                    <section className={styles.faqContainer}>
                        <h3>Frequently Asked Questions</h3>
                        <div className={styles.faqItem}>
                            <h4>How does CosuAI work?</h4>
                            <p>CosuAI uses advanced AI algorithms to suggest improvements for your resumes and cover letters.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h4>Is it easy to use?</h4>
                            <p>Absolutely! Our platform is user-friendly and designed for everyone.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h4>What types of documents can I create?</h4>
                            <p>You can create resumes and cover letters.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h4>Is CosuAI free to use?</h4>
                            <p>Yes! We offer a free plan so you can explore our features before committing.</p>
                        </div>
                    </section>

                    {/* Newsletter Section */}
                    <section className={styles.newsletter}>
                        <h3>Stay Updated</h3>
                        <input type="email" className={styles.emailInput} placeholder="Enter your email" />
                        <button className={styles.subscribeButton}>Subscribe</button>
                    </section>

                    {/* Helpful For Section */}
                    <section className={styles.helpfulForSection}>
                        <h3>Helpful For</h3>
                        <div className={styles.helpfulForList}>
                            <div className={styles.helpfulForItem}>Job Seekers</div>
                            <div className={styles.helpfulForItem}>Students</div>
                            <div className={styles.helpfulForItem}>Professionals</div>
                            <div className={styles.helpfulForItem}>Career Changers</div>
                            <div className={styles.helpfulForItem}>Recruiters</div>
                        </div>
                    </section>

                    {/* Social Media Links Section */}
                    <section className={styles.socialMedia}>
                        <h3>Connect with Us</h3>
                        <div className={styles.socialLinks}>
                            <a href="https://twitter.com/CosuAI" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://linkedin.com/company/cosai" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://facebook.com/CosuAI" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </div>
                    </section>

                    {/* Footer Section */}
                    <footer className={styles.footer}>
                        <p>&copy; 2024 CosuAI. All rights reserved.</p>
                    </footer>
                </div>
            </div>

            {/* Authentication Modal */}
            {isModalOpen && <AuthModal isOpen={isModalOpen} onClose={toggleModal} authMessage={authMessage} />} {/* Pass authMessage here */}
        </Layout>
    );
}

export default LandingPage;
