import React from 'react'
import styles from './MoneyIncome.module.css'


export default function Categories(props) {

    return (
        <div key={props.key} onClick={() => props.setActive(props.id)} id={props.id} className={props.active === props.id ? styles['categories_active'] : styles['categories']}>
            <div className={styles['categories_block']} >
                <div>{props.title}</div>
            </div>
        </div>
    )
}
