import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TOPICS = ["arrays", "dp", "hashing", "linked-list", "graphs", "trees", "recursion", "sliding window", "strings", "greedy"];

const TopicComparisonChart = ({ currentUser, searchedUser, currentTopicCounts, searchedTopicCounts }) => {
    const data = {
        labels: TOPICS,
        datasets: [
            {
                label: `${currentUser.handle}'s Solved Topics`,
                data: TOPICS.map(topic => currentTopicCounts[topic] || 0),
                backgroundColor: "rgb(75, 192, 192)",
            },
            {
                label: `${searchedUser.handle}'s Solved Topics`,
                data: TOPICS.map(topic => searchedTopicCounts[topic] || 0),
                backgroundColor: "rgb(255, 99, 132)",
            }
        ]
    };

    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                title: { 
                    display: true, 
                    text: 'Number of Questions Solved', 
                    font: {
                        size: 17, // Title font size
                        family: 'Arial', // Title font family
                        weight: 'bold', // Title font weight
                    }
                },
                ticks: {
                    font: {
                        size: 15, // Tick font size
                        family: 'Arial', // Tick font family
                    }
                }
            },
            y: { 
                title: { 
                    display: true, 
                    text: 'Topics', 
                    font: {
                        size: 17, // Title font size
                        family: 'Arial', // Title font family
                        weight: 'bold', // Title font weight
                    }
                },
                ticks: {
                    font: {
                        size: 15, // Tick font size
                        family: 'Arial', // Tick font family
                    }
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 15, // Legend font size
                        family: 'Arial', // Legend font family
                    }
                }
            }
        }
    };
    

    return <Bar data={data} options={options} />;
};

export default TopicComparisonChart;
