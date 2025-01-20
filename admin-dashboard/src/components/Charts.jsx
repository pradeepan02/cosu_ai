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
                const response = await axios.get('https://cosu-ai.onrender.com/user-count-history');
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
                borderColor: '#4c9aff',
                backgroundColor: 'rgba(76, 154, 255, 0.5)',
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 8,
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
                borderColor: '#34d399',
                backgroundColor: 'rgba(52, 211, 153, 0.5)',
                tension: 0.3,
                pointRadius: 5,
                pointHoverRadius: 8,
                fill: false,
            },
        ],
    };

    const barChartData = {
        labels: userData.dates,
        datasets: [
            {
                label: 'Daily New Sign-ups (Bar)',
                data: userData.counts,
                backgroundColor: 'rgba(255, 127, 80, 0.8)',
                hoverBackgroundColor: '#ff4500',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#fff',
                titleColor: '#000',
                bodyColor: '#000',
                borderWidth: 1,
                borderColor: '#ddd',
            },
            title: {
                display: true,
                text: 'User Sign-ups Over Time',
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#333',
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    color: '#333',
                },
                grid: {
                    color: '#e5e5e5',
                },
            },
        },
    };

    return (
        <div className="userStats" style={styles.container}>
            <h2 style={styles.title}>User Growth Charts</h2>

            <div style={styles.grid}>
                {/* Line Chart for Daily New Sign-ups */}
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Daily New Sign-ups (Line Chart)</h3>
                    <div style={styles.chart}>
                        <Line data={lineChartData} options={chartOptions} />
                    </div>
                </div>

                {/* Cumulative Sign-ups Line Chart */}
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Cumulative Sign-ups</h3>
                    <div style={styles.chart}>
                        <Line data={cumulativeChartData} options={chartOptions} />
                    </div>
                </div>

                {/* Bar Chart for Daily New Sign-ups */}
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Daily New Sign-ups (Bar Chart)</h3>
                    <div style={styles.chart}>
                        <Bar data={barChartData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: '"Arial", sans-serif',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
    },
    cardTitle: {
        fontSize: '18px',
        marginBottom: '15px',
        color: '#555',
    },
    chart: {
        height: '300px',
    },
};

export default Charts;
