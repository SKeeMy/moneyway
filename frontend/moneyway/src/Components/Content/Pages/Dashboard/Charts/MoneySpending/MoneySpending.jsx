import React, { useState } from 'react'
import styles from './MoneySpending.module.css'
import { Bar } from 'react-chartjs-2'
import MoneySpendingBar, { MoneySpendingBarCircle } from './MoneySpendingBar'
import { Data } from '../../../../../../utils/Data'


export default function MoneySpending() {



    const dateLabels = Data[0].diagram.reduce((acc, curr) => {
        acc.push(curr.created_at);
        return acc;
    }, []);

    const balanceData = Data[0].diagram.reduce((acc, curr) => {
        acc.push(curr.balance);
        return acc;
    }, []);

    const [spendData, setSpendData] = useState({
        labels: dateLabels,
        datasets: [
            {
                label: "Money Spend",
                data: balanceData,
                backgroundColor: ['rgb(167, 167, 167)'],
                hoverBackgroundColor: ['#FF6384'],
                borderColor: 'White',
                borderWidth: 3,
                borderRadius: 20,

            }
        ]
    });
    const [spendCategory, setSpendCategory] = useState({
        labels: Object.keys(Data[0].cicle),
        datasets: [{
            label: "Categories",
            data: Object.values(Data[0].cicle)
        }]
    })


    return (
        <div className={styles['bar_wrapper']}>

            <div style={{ display: 'grid', gridTemplateColumns: '88% 12%' }}>

                <MoneySpendingBar chartData={spendData} />
                <div className={styles['switch_wrapper']}>
                    <div className={styles['switch']}>7 days</div>
                    <div className={styles['switch']}>30 days</div>
                </div>
            </div>
            <div>
                <MoneySpendingBarCircle categoryData={spendCategory} />
            </div>
        </div>
    )
}
