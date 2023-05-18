import React from 'react'
import Tilt from 'react-parallax-tilt'
import styles from './Dashboard.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function DashboardCard(props) {
    let value = 0;
    return (
        

        <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
            <div onClick={() => { props.setActive(props.id) }} key={props.id} className={props.active === props.id ? styles['Dashboard_card_active'] : styles['Dashboard_card']}>
                <FontAwesomeIcon className={styles['icon']} icon={faWallet} />
                <h3 className={styles['title']}>{props.title}</h3>
                <form className={styles['form_card']}>
                    <input key={props.id} className={styles['input_card']} type="number" value={0} placeholder={value + props.currency} />
                    <button className={props.active === props.id ? styles['Dashboard_btn_active'] : styles['Dashboard_btn']} >Save</button>
                </form>

                {/* {props.active === props.id &&
                    <div className={styles['modal_window']}>
                        <form >
                            <input key={props.id} onFocus={() => setFocused(props.id)} type="number" placeholder='Changing value' />
                            <button>Submit</button>
                        </form>
                    </div>} */}
            </div>
        </ Tilt>
    )
}
