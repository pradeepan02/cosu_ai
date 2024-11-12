import React from 'react';
import './Dashboard.css'; // Importing the CSS file
import UserStats from './UserStats';
import Charts from './Charts';

const Dashboard = () => {
    return (
        <div className="dashboardContainer">
            <h1>Admin Dashboard</h1>
            <UserStats />
            <Charts />
        </div>
    );
};

export default Dashboard;
