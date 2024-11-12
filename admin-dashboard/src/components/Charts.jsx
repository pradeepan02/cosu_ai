import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    LineController,
    BarElement,
    BarController,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    LineController,
    BarElement,
    BarController,
    Title,
    Tooltip,
    Legend
);

const Charts = () => {
    const [userData, setUserData] = useState({ dates: [], counts: [], cumulativeCounts: [] });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://cosu-ai-backend.onrender.com/user-count-history');
                const data = response.data.data;

                // Extract dates and counts
                const dates = data.map(entry => entry.date.split('T')[0]);
                const counts = data.map(entry => entry.count);

                // Calculate cumulative count
                const cumulativeCounts = counts.reduce((acc, count, index) => {
                    acc.push((acc[index - 1] || 0) + count);
                    return acc;
                }, []);

                setUserData({ dates, counts, cumulativeCounts });
            } catch (error) {
                console.error('Error fetching user count data:', error);
            }
        };

        fetchUserData();
    }, []);

    // Chart configurations
    const lineChartData = {
        labels: userData.dates,
        datasets: [
            {
                label: 'Daily New Sign-ups',
                data: userData.counts,
                borderColor: '#00bfff',
                backgroundColor: '#00bfff',
                tension: 0.1,
                fill: false,
            },
        ],
    };

    const cumulativeChartData = {
        labels: userData.dates,
        datasets: [
            {
                label: 'Cumulative Sign-ups',
                data: userData.cumulativeCounts,
                borderColor: '#3cb371',
                backgroundColor: '#3cb371',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const barChartData = {
        labels: userData.dates,
        datasets: [
            {
                label: 'Daily New Sign-ups (Bar)',
                data: userData.counts,
                backgroundColor: '#ff7f50',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'User Sign-ups Over Time',
            },
        },
    };

    return (
        <div className="userStats">
            <h2>User Growth Charts</h2>
            
            {/* Line Chart for Daily New Sign-ups */}
            <div className="chartContainer">
                <h3>Daily New Sign-ups (Line Chart)</h3>
                <Line data={lineChartData} options={{ ...chartOptions, title: { text: 'Daily New Sign-ups' } }} />
            </div>

            {/* Cumulative Sign-ups Line Chart */}
            <div className="chartContainer">
                <h3>Cumulative Sign-ups</h3>
                <Line data={cumulativeChartData} options={{ ...chartOptions, title: { text: 'Cumulative Sign-ups' } }} />
            </div>

            {/* Bar Chart for Daily New Sign-ups */}
            <div className="chartContainer">
                <h3>Daily New Sign-ups (Bar Chart)</h3>
                <Bar data={barChartData} options={{ ...chartOptions, title: { text: 'Daily New Sign-ups (Bar)' } }} />
            </div>
        </div>
    );
};

export default Charts;
