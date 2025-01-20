import React, { useContext, useState } from 'react';
import './ContactPage.css'; // Import the CSS file
import Layout from './Layout';
import { AuthContext } from './AuthContext';
import AuthModal from './AuthModal';

function ContactPage() {
    const { isAuthenticated, setAuthMessage, authMessage } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [feedback, setFeedback] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isAuthenticated) {
            try {
                const response = await fetch('https://cosu-ai.onrender.com/send_message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sender: formData.name,
                        sender_mail: formData.email,
                        message: formData.message
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    setFeedback("Message sent successfully!");
                    setFormData({ name: '', email: '', message: '' }); // Reset form fields
                } else {
                    setFeedback(result.detail || "Failed to send message.");
                }
            } catch (error) {
                setFeedback("An error occurred. Please try again later.");
                console.error("Error sending message:", error); // Log error for debugging
            }
        } else {
            setAuthMessage("Please sign in to send a message."); // Set auth message
            toggleModal(); // Open modal
        }
    };

    return (
        <Layout>
            <div id="contactPage">
                <h1>Contact Us</h1>
                <p>If you have any questions, feel free to reach out!</p>
                <form onSubmit={handleSubmit} className="contactForm">
                    <div className="formGroup">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="contact-name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="contact-email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="contact-message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submitButton">Send Message</button>
                </form>
                {feedback && <p className="feedback">{feedback}</p>}
                {isModalOpen && <AuthModal isOpen={isModalOpen} onClose={toggleModal} authMessage={authMessage} />}
            </div>
        </Layout>
    );
}

export default ContactPage;
