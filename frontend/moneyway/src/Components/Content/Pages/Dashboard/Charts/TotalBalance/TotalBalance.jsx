import React from 'react'
import styles from './TotalBalance.module.css'
import axios from 'axios'
import MoneyBalanceBar from './TotalBalanceBar'
import { useState, useEffect } from 'react'

export default function TotalBalance() {
    const [chart, setChart] = useState([])
    function formatDate(dateString) {
        let date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return day + '-' + month + '-' + year;
    };
    let url = 'http://backend/api/balance/month'
    useEffect(() => {
        const fetchData = async () => {
            await axios.post(url, { remember_token: localStorage.getItem('remember_token') })
                .then(res => {
                    console.log(res.data.data)
                    setChart(res.data.data)
                })
                .catch(error => {
                    alert('Oops, some error here: ' + error);
                    console.error('Error while sending data:', error);
                });
        }

        setTimeout(() => {
            fetchData();
        }, 100)
    }, [url])
    const labelsGraphic = chart.map(item => formatDate(item.created_at))
    let data = {
        labels: labelsGraphic,
        datasets: [
            {
                fill: true,
                data: chart.map(item => item.balance),
                backgroundColor: ['rgba(255, 10, 300, 0.1)'],
                hoverBackgroundColor: ['white'],
                borderColor: '#FF6384',
                borderWidth: 3,
                borderRadius: 20,
            }
        ]
    }
    return (
        <div className={styles['bar_wrapper']}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <MoneyBalanceBar data={data} />
            </div>
        </div>
    )
}
