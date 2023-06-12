import React, { useState, useEffect } from 'react'
import styles from './MoneyIncome.module.css'
import MoneyIncomeBar, { MoneyIncomeBarCircle } from './MoneyIncomeBar'
import Loader from '../../../../../../utils/Loading/Loader/Loader'
import axios from 'axios'


export default function MoneyIncome() {
    const [chart, setChart] = useState([])
    const [cicle, setCircle] = useState([])
    const [loading, setLoading] = useState(false)

    const [url, setUrl] = useState('http://backend/api/income/week')

    function formatDate(dateString) {
        let date = new Date(dateString);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return day + '-' + month + '-' + year;
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [url]);
    useEffect(() => {
        const fetchData = async () => {
            await axios.post(url, { remember_token: localStorage.getItem('remember_token') })
                .then(res => {
                    console.log(res.data.data.diagram)
                    setChart(res.data.data.diagram)
                    setCircle(res.data.data.cicle)
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
                label: "Money Spend",
                data: chart.map(item => item.balance),
                backgroundColor: ['rgb(167, 167, 167)'],
                hoverBackgroundColor: ['#FF6384'],
                borderColor: 'White',
                borderWidth: 3,
                borderRadius: 20,
            }
        ]
    }

    const categoryLabels = cicle ? Object.keys(cicle) : [];
    let categoryData = {};
    if (cicle && categoryLabels.length > 0) {
        categoryData = {
            labels: categoryLabels,
            datasets: [
                {
                    label: "Categories",
                    data: Object.values(cicle),
                    borderWidth: 3,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#8B008B",
                        "#FFA07A",
                        "#00FFFF",
                        "#7B68EE",
                        "#00FA9A",
                        "#FF69B4",
                        "#1E90FF",
                        "#FFD700",
                        "#00FF7F"
                    ],
                    cutoutPercentage: 50,
                    borderRadius: 20
                }
            ]
        };
    } else {
        categoryData = {
            labels: ["Here is empty, wait more information"],
            datasets: []
        };
    }



    return (
        loading ? <div style={{ display: 'grid', gridTemplateColumns: '100%' }} className={styles['bar_wrapper']}><Loader /></div> :
            <div className={styles['bar_wrapper']}>
                <div style={{ display: 'grid', gridTemplateColumns: '85% 15%' }}>
                    <MoneyIncomeBar data={data} />
                    <div className={styles['switch_wrapper']}>
                        <div onClick={() => setUrl('http://backend/api/income/week')}
                            className={url === 'http://backend/api/income/week' ? styles['switch_active'] : styles['switch']}>7 days</div>
                        <div onClick={() => setUrl('http://backend/api/income/month')}
                            className={url === 'http://backend/api/income/month' ? styles['switch_active'] : styles['switch']}>30 days</div>
                    </div>
                </div>
                <div>
                    <MoneyIncomeBarCircle categoryData={categoryData} />
                </div>
            </div>
    )
}  
