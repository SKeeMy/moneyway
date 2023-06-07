import React, { useState, useEffect } from 'react'
import styles from './MoneyIncome.module.css'
import MoneyIncomeBar, { MoneyIncomeBarCircle } from './MoneyIncomeBar'
import { DATA_7_SPEND, DATA_30_SPEND } from '../../../../../../utils/Data'
import Loader from '../../../../../../utils/Loading/Loader/Loader'


export default function MoneyIncome() {
    const [days, setDays] = useState(true)
    const [spendCategory, setSpendCategory] = useState({ labels: [], datasets: [] });
    const [spendData, setSpendData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        let DATA;

        if (days === false) {
            DATA = DATA_7_SPEND;
        } else {
            DATA = DATA_30_SPEND;
        }
        const dateLabels = DATA[0].diagram.reduce((acc, curr) => {
            acc.push(curr.created_at);
            return acc;
        }, []);
        const balanceData = DATA[0].diagram.reduce((acc, curr) => {
            acc.push(curr.balance);
            return acc;
        }, []);
        setSpendData({
            labels: dateLabels,
            datasets: [
                {
                    data: balanceData,
                    backgroundColor: ["rgb(167, 167, 167)"],
                    hoverBackgroundColor: ["#FF6384"],
                    borderColor: "White",
                    borderWidth: 3,
                    borderRadius: 20,
                },
            ],
        });
        setSpendCategory({
            labels: Object.keys(DATA[0].cicle),
            datasets: [
                {
                    label: "Categories",
                    data: Object.values(DATA[0].cicle),
                },
            ],
        });
    }, [days]);


    return (
        loading ? <div style={{ display: 'grid', gridTemplateColumns: '100%' }} className={styles['bar_wrapper']}><Loader /></div> :
            <div className={styles['bar_wrapper']}>
                <div style={{ display: 'grid', gridTemplateColumns: '88% 12%' }}>
                    <MoneyIncomeBar chartData={spendData} />
                    <div className={styles['switch_wrapper']}>
                        <div onClick={() => setDays(false)} className={days ? styles['switch'] : styles['switch_active']}>7 days</div>
                        <div onClick={() => setDays(true)} className={!days ? styles['switch'] : styles['switch_active']}>30 days</div>
                    </div>
                </div>
                <div>
                    <MoneyIncomeBarCircle categoryData={spendCategory} />
                </div>
            </div>
    )
}  
