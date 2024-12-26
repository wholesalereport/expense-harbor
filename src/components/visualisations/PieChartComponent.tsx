import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React from 'react';
import {isNull} from "lodash";

ChartJS.register(ArcElement, Tooltip, Legend);


const PieChartComponent = ({data}) => {
    if(!data || isNull(data)){
        return null;
    }
    const labels = Object.keys(data).map((key) => `${key} (${data[key].toFixed(2)})`);
    const values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Sales by Category',
                data: values,
                backgroundColor: generateRandomColors(labels.length), // Generate random colors
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
        },
        maintainAspectRatio: false,
    };
    // @ts-ignore
    return <Pie data={chartData} options={options} />;
};

function generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colors.push(`rgba(${r}, ${g}, ${b}, 0.8)`);
    }
    return colors;
}

export default PieChartComponent;