// Stats.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Stats = ({ stats, setStats, showstats }) => {
    const labels = []
    const wpms = []
    const acc = []
    stats.map((item, index) => (
        labels.push(item.time)
    ))
    stats.map((item, index) => (
        wpms.push(item.wpm)
    ))
    stats.map((item, index) => (
        acc.push(item.accuracy)
    ))
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'WPM',
                data: wpms,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.4
            },
            {
                label: 'Accuracy',
                data: acc,
                borderColor: 'rgba(255, 201, 51, 1)',
                fill: true,
                tension: 0.4
            },
        ],
    };

    // Chart configuration options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Statistics',
            },
        },
    };

    return (
        <div className='bg-slate-950 flex justify-center flex-col items-center p-10'>
            {showstats && <h1 className='text-4xl text-center'>Statistics</h1>}
            {showstats && <Line data={data} options={options} />}
        </div>
    );
};

export default Stats;
