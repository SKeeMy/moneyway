import React from 'react'
import styles from './MoneyIncome.module.css'
import AddCategories from './AddCategories'




export default function MoneyIncomeEdit(props) {

    return (
        <div className={styles['add_wrapper']}>
            <h2>Adding a new operation</h2>
            <AddCategories setSend={props.setSend} send={props.send} />
        </div>
    )
}
