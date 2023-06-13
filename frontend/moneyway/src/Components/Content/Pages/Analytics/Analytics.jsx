import React from 'react';
import styles from './Analytics.module.css'
import '../../../../App.css'
import { motion } from 'framer-motion';
import MoneyIncome from '../Dashboard/Charts/MoneyIncome/MoneyIncome';
import MoneySpending from '../Dashboard/Charts/MoneySpending/MoneySpending';

export default function Analytics(props) {
    return (
        <motion.div onClick={() => props.setSidebar(false)}
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className='inner_wrapper'>
            <h1>Analytics</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }} className='innerBackground'>
                <div className={styles['wrapper']}>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <h4>Money Income</h4>
                        <MoneyIncome />
                    </div>
                    <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }} >
                        <h4 >Money Spending</h4>
                        <MoneySpending />
                    </div>
                </div>
            </div>
        </motion.div >
    )
}
