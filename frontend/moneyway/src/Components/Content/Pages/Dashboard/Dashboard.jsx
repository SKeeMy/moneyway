import React from 'react'
import styles from './Dashboard.module.css'
import '../../../../App.css'
import { motion } from 'framer-motion'

export default function Dashboard() {
    return (
        <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className='inner_wrapper'>
            <h1>Dashboard</h1>
            <div className='innerBackground'>

            </div>
        </motion.div>
    )
}
