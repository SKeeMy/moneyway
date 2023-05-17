import React from 'react';
import styles from './Analytics.module.css'
import '../../../../App.css'
import { motion } from 'framer-motion';

export default function Analytics() {
    return (
        <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className='inner_wrapper'>
            <h1>Analytics</h1>
            <div className='innerBackground'>

            </div>
        </motion.div>
    )
}
