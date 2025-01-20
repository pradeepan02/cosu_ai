import React from 'react';
import './Dashboard.css';
import UserStats from './UserStats';
import Charts from './Charts';

const Dashboard = () => {
    return (
        <div className="dashboardContainer">
            <h1>Welcome to the Admin Dashboard</h1>
            <UserStats />
            <Charts />
        </div>
    );
};

export default Dashboard;
