import React from 'react'
import styles from './Loader.module.css'

export default function Loader() {
    return (
        <div className={styles['loader_wrapper']}>
            <div className={styles["ring"]}></div>
            <h4>MoneyWay</h4>
        </div >
    )
}
