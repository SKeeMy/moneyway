import React from 'react'
import Tilt from 'react-parallax-tilt'
import styles from './Dashboard.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faMoneyBillTransfer, faCoins } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const iconsMaping =
{
    'faWallet': faWallet,
    'faMoneyBillTransfer': faMoneyBillTransfer,
    'faCoins': faCoins
}


export default function DashboardCard(props) {
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(0);

    const handleChange = (event) => {
        setText(event.target.value);
    }
    return (
        <Tilt className={styles['card_width']} tiltMaxAngleX={2} tiltMaxAngleY={2}>

            <div onClick={() => { props.setActive(props.id) }} key={props.id} className={props.active === props.id ? styles['Dashboard_card_active'] : styles['Dashboard_card']}>
                <FontAwesomeIcon className={styles['icon']} icon={iconsMaping[props.icon]} />
                <h3 className={styles['title']}>{props.title}</h3>
                <form className={styles['form_card']}>
                    <input onChange={handleChange} key={props.id} className={edit ? styles['input_card_active'] : styles['input_card']} type="number" value={text} />
                    <div onClick={() => setEdit(prevEdit => !prevEdit)} className={styles['edit_btn']}>{edit === false ? 'Edit' : 'Cancel'}</div>
                    {edit && <button className={props.active === props.id ? styles['Dashboard_btn_active'] : styles['Dashboard_btn']} >Save</button>}
                </form>
            </div >

        </ Tilt >
    )
}

export function DashboardCards(props) {
    const [edit, setEdit] = useState(false);


    return (
        <Tilt className={styles['card_width']} tiltMaxAngleX={2} tiltMaxAngleY={2}>

            <div onClick={() => { props.setActive(props.id) }} key={props.id} className={props.active === props.id ? styles['Dashboard_card_active'] : styles['Dashboard_card']}>
                <FontAwesomeIcon className={styles['icon']} icon={iconsMaping[props.icon]} />
                <h3 className={styles['title']}>{props.title}</h3>
                <form className={styles['form_card']}>
                    <div key={props.id} onClick={() => setEdit(prevEdit => !prevEdit)} className={styles['edit_btn']}>{edit === false ? 'Edit' : 'Cancel'}</div>
                    {edit && <button className={props.active === props.id ? styles['Dashboard_btn_active'] : styles['Dashboard_btn']} >Save</button>}
                </form>
            </div >

        </ Tilt >
    )
}