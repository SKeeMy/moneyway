import React from 'react'
import styles from './Dashboard.module.css'
import '../../../../App.css'
import { motion } from 'framer-motion'
import { useState } from 'react';
import DashboardCard from './DashboardCard';
import { DashboardCards } from './DashboardCard';

const dashboardCards = [
    {
        id: 1,
        title: 'Total Balance',
        icon: 'faWallet',
        currency: '₽'
    },
    {
        id: 2,
        title: 'Spending Money',
        icon: 'faMoneyBillTransfer',
        currency: '₽'
    },
    {
        id: 3,
        title: 'Money Saved',
        icon: 'faCoins',
        currency: '₽'
    },
]

export default function Dashboard() {
    const [totalBalanceChange, setTotalBalanceChange] = useState(false)
    const [value, setValue] = useState(0);
    const [active, setActive] = useState(0);
    console.log(active)
    return (
        <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className='inner_wrapper'>
            <h1>Dashboard</h1>
            <div className={styles['innerBackground']}>
                <div className={styles['Dashboard_wrapper']}>
                    <div className={styles['card_wrapper']}>
                        {dashboardCards.map((card) => {
                            if (card.id === 1)
                                return (
                                    <DashboardCard className={active === card.id ? styles['Dashboard_card_active'] : styles['Dashboard_card']}
                                        key={card.id}
                                        icon={card.icon}
                                        id={card.id}
                                        active={active}
                                        setActive={setActive}
                                        title={card.title}
                                        currency={card.currency}
                                        totalBalanceChange={totalBalanceChange}
                                        setTotalBalanceChange={setTotalBalanceChange}
                                        value={value}
                                        setValue={setValue} />
                                )
                            else
                                return (
                                    <DashboardCards className={active === card.id ? styles['Dashboard_card_active'] : styles['Dashboard_card']}
                                        key={card.id}
                                        icon={card.icon}
                                        id={card.id}
                                        active={active}
                                        setActive={setActive}
                                        title={card.title}
                                        currency={card.currency}
                                        totalBalanceChange={totalBalanceChange}
                                        setTotalBalanceChange={setTotalBalanceChange}
                                        value={value}
                                        setValue={setValue} />
                                )
                        }

                        )
                        }
                    </div>
                </div>
                <div className={styles['graphics']}>
                    Graphics
                </div>
            </div>
        </motion.div>
    )
}
