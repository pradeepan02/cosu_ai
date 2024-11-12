import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Messages.css'; // Importing the CSS file

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8000/messages'); // Ensure this endpoint returns messages
                setMessages(response.data); // Adjust according to your backend response structure
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="messages">
            <h2>User Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <strong>{msg.sender}</strong>: {msg.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Messages;