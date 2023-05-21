import React from 'react'
import styles from './Dashboard.module.css'
import '../../../../App.css'
import { motion } from 'framer-motion'
import { useState } from 'react';
import DashboardCard from './DashboardCard';
import { DashboardCards } from './DashboardCard';
import TotalBalance from './Charts/TotalBalance/TotalBalance';
import MoneySpending from './Charts/MoneySpending/MoneySpending';
import MoneySaved from './Charts/MoneySaved/MoneySaved';
import MoneySpendingEdit from './Charts/MoneySpending/MoneySpendingEdit';

const dashboardCards = [
    {
        id: 1,
        title: 'Total Balance',
        icon: 'faWallet',
        currency: '₽'
    },
    {
        id: 2,
        title: 'Money Spending',
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
    const [btnEdit, setBtnEdit] = useState('hi');

    console.log(btnEdit)
    console.log(active)
    const displayData = () => {
        switch (active) {
            case 1:
                return <TotalBalance />
            case 2:
                return <MoneySpending />
            case 3:
                return <MoneySaved />
            default: return <TotalBalance />
        }
    }
    const spendEdit = () => {
        switch (btnEdit) {
            case false:
                return <MoneySpendingEdit />
            default: return <MoneySpending />
        }
    }
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
                                        setBtnEdit={setBtnEdit}
                                        key={card.id}
                                        icon={card.icon}
                                        id={card.id}
                                        active={active}
                                        setActive={setActive}
                                        title={card.title}
                                        currency={card.currency}
                                        totalBalanceChange={totalBalanceChange}
                                        setTotalBalanceChange={setTotalBalanceChange}
                                        setValue={setValue} />
                                )
                        }

                        )
                        }
                    </div>
                </div>
                <div className={styles['graphics']}>
                    {active === 2 ? spendEdit() : displayData()}
                </div>
            </div>
        </motion.div>
    )
}
