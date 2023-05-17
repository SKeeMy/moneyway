import React from 'react'
import styles from './Dashboard.module.css'
import '../../../../App.css'
import { motion } from 'framer-motion'
import { useState } from 'react';
import DashboardCard from './DashboardCard';

const dashboardCards = [
    {
        id: 1,
        title: 'Total Balance',
        currency: '₽'
    },
    {
        id: 2,
        title: 'Spending Money',
        currency: '₽'
    },
    {
        id: 3,
        title: 'Money Saved',
        currency: '₽'
    },
]

export default function Dashboard() {
    const [totalBalanceChange, setTotalBalanceChange] = useState(false)
    const [value, setValue] = useState(0);
    const [active, setActive] = useState(1);
    console.log(active)

    console.log(value)
    return (
        <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className='inner_wrapper'>
            <h1>Dashboard</h1>
            <div className='innerBackground'>
                <div className={styles['Dashboard_wrapper']}>
                    {dashboardCards.map((card) => (
                        <DashboardCard
                            key={card.id}
                            id={card.id}
                            active={active}
                            setActive={setActive}
                            title={card.title}
                            currency={card.currency}
                            totalBalanceChange={totalBalanceChange}
                            setTotalBalanceChange={setTotalBalanceChange}
                            value={value}
                            setValue={setValue} />
                    ))
                    }
                </div>


            </div>
        </motion.div>
    )
}
