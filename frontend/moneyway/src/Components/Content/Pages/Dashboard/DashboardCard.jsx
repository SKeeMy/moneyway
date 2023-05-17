import React from 'react'
import Tilt from 'react-parallax-tilt'
import styles from './Dashboard.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function DashboardCard(props) {
    const [focused, setFocused] = useState(1);
    console.log(focused)
    console.log(focused)
    return (

        <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
            <div onClick={() => { props.setActive(props.id) }} key={props.id} className={styles['Dashboard_card']}>
                <FontAwesomeIcon className={styles['icon']} icon={faWallet} />
                <h3 className={styles['title']}>{props.title}</h3>
                <h3 onClick={() => props.setTotalBalanceChange(prevTotalBalanceChange => !prevTotalBalanceChange)} className={styles['balance']}>{props.value + props.currency}<FontAwesomeIcon icon={faPencilAlt} /> </h3>

                {props.active === props.id &&
                    <div className={styles['modal_window']}>
                        <form >
                            <input key={props.id} onFocus={() => setFocused(props.id)} type="number" placeholder='Changing value' />
                            <button>Submit</button>
                        </form>
                    </div>}
            </div>
        </ Tilt>
    )
}
