import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserStats.css';

const UserStats = () => {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const response = await axios.get('https://cosu-ai.onrender.com/user-count');
                setUserCount(response.data.count);
            } catch (error) {
                console.error('Error fetching user count:', error);
            }
        };

        fetchUserCount();
    }, []);

    return (
        <div className="userStats">
            <h2>Total Users Signed Up</h2>
            <p>{userCount}</p>
        </div>
    );
};

export default UserStats;
