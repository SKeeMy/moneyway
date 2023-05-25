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
    const [text, setText] = useState('');

    const remember_token = localStorage.getItem("remember_token");

    useEffect(() => {
        const postToken = async () => {
            try {
                const response = await axios.post('http://backend/api/balance/present_day', { remember_token: remember_token });
                console.log(response);
                setText(response.data.data.balance);
            }
            catch (error) {
                console.log(error)
            }
        };
        postToken();
    }, [remember_token])

    // useEffect(() => {
    //     const postToken = async () => {
    //         try {
    //             const response = await axios.post('http://backend/api/balance/add', { remember_token: remember_token, 'balance': parseInt(text) });
    //             console.log(response);
    //             setText(response.data.data.balance);
    //         }
    //         catch (error) {
    //             console.log(error)
    //         }
    //     };
    //     postToken();
    // }, [remember_token, text])





    const sendBalance = () => {
        axios.post('http://backend/api/balance/add', { remember_token: remember_token, 'balance': parseInt(text) })
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
        setText(event.target.value);
    }
    return (
        <Tilt className={styles['card_width']} tiltMaxAngleX={2} tiltMaxAngleY={2}>

            <div onClick={() => { props.setActive(props.id) }} key={props.id} className={props.active === props.id ? styles['Dashboard_card_active'] : styles['Dashboard_card']}>
                <FontAwesomeIcon className={styles['icon']} icon={iconsMaping[props.icon]} />
                <h3 className={styles['title']}>{props.title}</h3>
                <form onSubmit={handleSubmit} className={styles['form_card']}>
                    <div >

                        <input onChange={handleChange} prefix='$' key={props.id} className={edit ? styles['input_card_active'] : styles['input_card']} type="number" value={text} />
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
    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(prevEdit => !prevEdit)
        if (props.id === 2) {
            props.setAddBtn(prevBtnEdit => !prevBtnEdit)
            console.log('bye')
        }
        else if (props.id === 3) {
            props.setAddBtn(prevBtnEdit => !prevBtnEdit)
            console.log('hi')
        }

    }


    return (
        <Tilt className={styles['card_width']} tiltMaxAngleX={2} tiltMaxAngleY={2}>

            <div onClick={() => { props.setActive(props.id) }} key={props.id} className={props.active === props.id ? styles['Dashboard_card_active'] : styles['Dashboard_card']}>
                <FontAwesomeIcon className={styles['icon']} icon={iconsMaping[props.icon]} />
                <h3 className={styles['title']}>{props.title}</h3>
                <form className={styles['form_card']}>
                    <div key={props.id} onClick={handleEdit} className={styles['edit_btn']}>{edit === false ? <FontAwesomeIcon icon={faPlus} /> : 'Cancel'}</div>
                    {edit && <button className={props.active === props.id ? styles['Dashboard_btn_active'] : styles['Dashboard_btn']} >Save</button>}
                </form>
            </div >

        </ Tilt >
    )
}