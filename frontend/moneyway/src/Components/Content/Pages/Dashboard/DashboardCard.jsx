import React from 'react'
import Tilt from 'react-parallax-tilt'
import styles from './Dashboard.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faMoneyBillTransfer, faCoins, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const iconsMaping =
{
    'faWallet': faWallet,
    'faMoneyBillTransfer': faMoneyBillTransfer,
    'faCoins': faCoins
}


export default function DashboardCard(props) {
    const [edit, setEdit] = useState(false);


    const remember_token = localStorage.getItem("remember_token");

    useEffect(() => {
        const postToken = async () => {
            try {
                const response = await axios.post('http://backend/api/balance/give', { remember_token: remember_token });
                console.log(response);
                props.setText(response.data.data.start_balance);
            }
            catch (error) {
                console.log(error)
            }
        };
        postToken();
    }, [remember_token])

    const sendBalance = () => {
        axios.post('http://backend/api/balance/add', { remember_token: remember_token, 'balance': parseInt(props.text) })
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                alert('Oops, some error here: ' + error)
                console.error('Error while sending data:', error)
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendBalance();
        setEdit(false)
    }



    const handleChange = (event) => {
        props.setText(event.target.value);
    }
    return (
        <Tilt className={styles['card_width']} tiltMaxAngleX={2} tiltMaxAngleY={2}>

            <div onClick={() => { props.setActive(props.id) }} key={props.id} className={props.active === props.id ? styles['Dashboard_card_active'] : styles['Dashboard_card']}>
                <FontAwesomeIcon className={styles['icon']} icon={iconsMaping[props.icon]} />
                {edit === false ? <h3 className={styles['title']}>{props.title}</h3> : <h3 className={styles['title']}>Start Balance</h3>}
                <form onSubmit={handleSubmit} className={styles['form_card']}>
                    <div onClick={() => setEdit(true)} >

                        {edit === false ? <input onChange={handleChange} key={props.id} className={edit ? styles['input_card_active'] : styles['input_card']} type="number" value={props.balance} /> :
                            <input onChange={handleChange} key={props.id} className={edit ? styles['input_card_active'] : styles['input_card']} type="number" value={props.text} />}
                        <i className={styles['currency']}>₽</i>
                    </div>
                    <div onClick={() => setEdit(prevEdit => !prevEdit)} className={styles['edit_btn']}>{edit === false ? 'Edit' : 'Cancel'}</div>
                    {edit && <button className={props.active === props.id ? styles['Dashboard_btn_active'] : styles['Dashboard_btn']} onSubmit={handleSubmit} >Save</button>}
                </form>
            </div >

        </ Tilt >
    )
}

export function DashboardCards(props) {

    const handleEdit = () => {
        if (props.id === 2) {
            props.setAddBtn(prevBtnEdit => !prevBtnEdit)
            console.log('bye')

        }
        else if (props.id === 3) {
            props.setAddBtn(prevBtnEdit => !prevBtnEdit)
            console.log('hi')

        }
    }

    const handleClick = () => {
        props.setActive(props.id);
        if (props.addBtn === true) {
            props.setAddBtn(false);
        }

    }

    if (props.id === 2) {
        return (
            <Tilt className={styles['card_width']} tiltMaxAngleX={2} tiltMaxAngleY={2}>

                <div onClick={handleClick} key={props.id} className={props.active === props.id ? styles['Dashboard_card_active'] : styles['Dashboard_card']}>
                    <FontAwesomeIcon className={styles['icon']} icon={iconsMaping[props.icon]} />
                    <h3 className={styles['title']}>{props.title}</h3>
                    <  form className={styles['form_card']}>
                        <div key={props.id} onClick={handleEdit} className={styles['edit_btn']}>{props.addBtn === true ? 'Cancel' : <FontAwesomeIcon icon={faPlus} />}</div>
                        <i className={styles['currency']}>{props.spending}₽</i>
                    </form>

                </div >

            </ Tilt >
        )
    }
    if (props.id === 3) {
        return (
            <Tilt className={styles['card_width']} tiltMaxAngleX={2} tiltMaxAngleY={2}>

                <div onClick={handleClick} key={props.id} className={props.active === props.id ? styles['Dashboard_card_active'] : styles['Dashboard_card']}>
                    <FontAwesomeIcon className={styles['icon']} icon={iconsMaping[props.icon]} />
                    <h3 className={styles['title']}>{props.title}</h3>
                    <  form className={styles['form_card']}>
                        <div key={props.id} onClick={handleEdit} className={styles['edit_btn']}>{props.addBtn === true ? 'Cancel' : <FontAwesomeIcon icon={faPlus} />}</div>
                        <i className={styles['currency']}>{props.income}₽</i>
                    </form>

                </div >

            </ Tilt >
        )
    }

}