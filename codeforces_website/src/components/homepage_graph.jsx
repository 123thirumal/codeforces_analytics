import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function RatingProgressionChart({ data, blue,username }) {
    if (!Array.isArray(data)) {
        console.warn("RatingProgressionChart received invalid data:", data);
        return <p>No rating progression data available</p>;
    }

    const chartData = {
        labels: data.map(item => new Date(item.ratingUpdateTimeSeconds * 1000).toLocaleDateString()),
        datasets: [
            {
                label: `${username}'s Rating Progression`,
                data: data.map(item => item.newRating),
                fill: false,
                backgroundColor: (blue)?"rgb(75, 192, 192)":"rgb(255, 99, 132)",
                borderColor: (blue)?"rgb(75, 192, 192,0.395)":"rgb(255, 99, 132,0.395)",
            }
        ]
    };

    const options = {
        scales: {
            x: { 
                type: 'category',  // Ensure the scale type is defined correctly
                display: true, 
                title: { display: true, text: 'Date' } 
            },
            y: { 
                display: true, 
                title: { display: true, text: 'Rating' } 
            }
        }
    };

    return <Line data={chartData} options={options} />;
}

export default RatingProgressionChart;
