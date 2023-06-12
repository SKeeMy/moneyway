import React from 'react'
import styles from './MoneyIncome.module.css'


export default function Categories(props) {
    function handler() {
        props.setTitle(props.title)
        props.setActive(props.id)
    }
    return (
        <div key={props.key} onClick={handler} id={props.id} className={props.active === props.id ? styles['categories_active'] : styles['categories']}>
            <div className={styles['categories_block']} >
                <div>{props.title}</div>
            </div>
        </div>
    )
}
