import React from 'react'
import styles from './MoneySpending.module.css'
import AddCategories from './AddCategories'




export default function MoneySpendingEdit(props) {

    return (
        <div className={styles['add_wrapper']}>
            <h2>Adding a new operation</h2>
            <AddCategories setSend={props.setSend} send={props.send} />
        </div>
    )
}
