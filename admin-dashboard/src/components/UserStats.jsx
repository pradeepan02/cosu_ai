import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserStats.css'; // Importing the CSS file

const UserStats = () => {
    const [userCount, setUserCount] = useState(0);
    
    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const response = await axios.get('https://cosu-ai-backend.onrender.com/user-count');
                setUserCount(response.data.count); // Adjust according to your backend response structure
                console.log('Response data:', response.data);
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        fetchUserCount();
    }, []);

    return (
        <div className="userStats">
            <h2>Total Users Signed Up: {userCount}</h2>
        </div>
    );
};

export default UserStats;
