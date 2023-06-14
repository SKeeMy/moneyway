import React from 'react'
import styles from './Dashboard.module.css'
import '../../../../App.css'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react';
import DashboardCard from './DashboardCard';
import { DashboardCards } from './DashboardCard';
import TotalBalance from './Charts/TotalBalance/TotalBalance';
import MoneySpending from './Charts/MoneySpending/MoneySpending';
import MoneyIncome from './Charts/MoneyIncome/MoneyIncome';
import MoneySpendingEdit from './Charts/MoneySpending/MoneySpendingEdit';
import MoneyIncomeEdit from './Charts/MoneyIncome/MoneyIncomeEdit';
import axios from 'axios';

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
        title: 'Money Income',
        icon: 'faCoins',
        currency: '₽'
    },
]



export default function Dashboard(props) {







    const [totalBalanceChange, setTotalBalanceChange] = useState(false)
    const [value, setValue] = useState(0);
    const [active, setActive] = useState(0);
    const [addBtn, setAddBtn] = useState(false);
    const [balance, setBalance] = useState(0);
    const [spending, setSpending] = useState(0);
    const [income, setIncome] = useState(0);
    const [send, setSend] = useState(0);
    const [text, setText] = useState(0);
    console.log('set send: ' + send)

    console.log('add btn = ' + addBtn)
    console.log('active =  ' + active)
    const displayData = () => {
        switch (active) {
            case 1:
                return <TotalBalance />
            case 2:
                return <MoneySpending />
            case 3:
                return <MoneyIncome />
            default: return <TotalBalance />
        }
    }
    const addEdit = () => {
        switch (addBtn) {
            case active === 2:
                return <MoneySpendingEdit setSend={setSend} send={send} />
            case active === 3:
                return <MoneyIncomeEdit setSend={setSend} send={send} />
            default: return <TotalBalance />
        }
    }
    const remember_token = localStorage.getItem("remember_token")
    useEffect(() => {
        const postToken = async () => {
            try {
                const response = await axios.post('http://backend/api/present_day', { remember_token: remember_token });
                console.log(response);
                setBalance(response.data.data.balance);
                setIncome(response.data.data.income);
                setSpending(response.data.data.expenses);
            }
            catch (error) {
                console.log(error)
            }
        };

        setTimeout(() => {
            postToken();
        }, 3000);
    }, [remember_token, send, balance, text])
    return (
        <motion.div onClick={() => props.setSidebar(false)}
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
                                        setValue={setValue}
                                        balance={balance}
                                        setBalance={setBalance}
                                        spending={spending}
                                        setSpending={setSpending}
                                        income={income}
                                        setIncome={setIncome}
                                        setText={setText}
                                        text={text} />

                                )
                            else
                                return (
                                    <DashboardCards className={active === card.id ? styles['Dashboard_card_active'] : styles['Dashboard_card']}
                                        addBtn={addBtn}
                                        setAddBtn={setAddBtn}
                                        key={card.id}
                                        icon={card.icon}
                                        id={card.id}
                                        active={active}
                                        setActive={setActive}
                                        title={card.title}
                                        currency={card.currency}
                                        totalBalanceChange={totalBalanceChange}
                                        setTotalBalanceChange={setTotalBalanceChange}
                                        setValue={setValue}
                                        balance={balance}
                                        setBalance={setBalance}
                                        spending={spending}
                                        setSpending={setSpending}
                                        income={income}
                                        setIncome={setIncome} />
                                )
                        }

                        )
                        }
                    </div>
                </div>
                <div className={styles['graphics']}>
                    {addBtn === true ? addEdit() : displayData()}
                </div>
            </div>
        </motion.div>
    )
}
