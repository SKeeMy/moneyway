import React from 'react';
//import styles from './Control.module.css'
import '../../../../App.css'
import { motion } from 'framer-motion';

export default function Control(props) {
    return (
        <motion.div onClick={() => props.setSidebar(false)}
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className='inner_wrapper'>
            <h1>Control</h1>
            <div className='innerBackground'>

            </div>
        </motion.div>
    )
}
