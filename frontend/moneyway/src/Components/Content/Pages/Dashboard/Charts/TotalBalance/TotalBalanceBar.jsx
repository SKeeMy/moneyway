import React from 'react'
import { Line } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js/auto'
import styles from './TotalBalance.module.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
)

export default function TotalBalanceBar({ data }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                scaleLabel: {
                    display: true,
                    labelString: 'X Axis Title',
                },
                grid: {
                    display: false,
                },
                ticks: {
                    display: true,
                    color: 'white',
                    font: {
                        family: "'Poppins', sans-serif",
                        size: 14
                    }
                },
            },

            y: {
                display: false,
                grid: {
                    display: false,
                },
            },

        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                font: {
                    family: "'Poppins', sans-serif",
                    size: 20
                },
                color: 'white',
                position: 'top'
            },
        }
    };
    return (
        <div className={styles['bar_chart']} >
            <Line data={data} options={options} />
        </div>
    )
}  
