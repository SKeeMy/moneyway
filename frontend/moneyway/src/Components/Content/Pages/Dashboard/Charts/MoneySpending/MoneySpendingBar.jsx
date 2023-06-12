import React from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js/auto'
import styles from './MoneySpending.module.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
)

export default function MoneySpendingBar({ data }) {

    const options = {
        responsive: true,
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
        <div className={styles['bar_chart']}>
            <Bar data={data} options={options} />
        </div>
    )
}


export function MoneySpendingBarCircle({ categoryData }) {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                font: {
                    family: "'Poppins', sans-serif",
                    color: 'white'
                }
            },
            title: {
                display: true,
                text: 'Details',
                font: {
                    family: "'Poppins', sans-serif",
                    size: 20
                },
                color: 'white',
                position: 'top'
            },
        }
    };

    <Doughnut options={options} data={categoryData} />


    return (
        <div className={styles['bar_chart_cicle']}>
            <Doughnut options={options} data={categoryData} />
        </div>
    )
}
