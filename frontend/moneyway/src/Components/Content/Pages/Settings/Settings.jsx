import React from 'react'
import { useState } from 'react'
import styles from './Settings.module.css'
import { motion } from 'framer-motion'
import '../../../../App.css'
import Register from '../../../RegisterPage/Register';
import axios from 'axios'

export default function Settings(props) {
    const token = localStorage.getItem('remember_token')
    const [values, setValues] = useState({
        old_password: "",
        new_password: "",
        remember_token: token

    });
    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const inputs = [
        {
            id: 1,
            name: "old_password",
            type: "password",
            placeholder: "Old password",

        },
        {
            id: 2,
            name: "new_password",
            type: "text",
            placeholder: "New password",
        },

    ]

    function sendAPI(values) {
        axios.post('http://backend/api/settings/change_password', values,)
            .then(res => {
                console.log(res)
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendAPI(values);
    }
    return (
        <motion.div onClick={() => props.setSidebar(false)}
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            className='inner_wrapper'>
            <h1>Settings</h1>
            <div style={{ padding: '25px 0' }} className='innerBackground'>
                <div style={{ width: '100%' }} className={styles['wrapper']}>
                    <div>
                        <div style={{ borderBottom: '2px solid white', width: '100%' }}>
                            <h4 className={styles['title']}>Security</h4>
                        </div>
                        <h5 >Change password</h5>
                        <div style={{ marginLeft: "40px" }}>
                            <form onSubmit={handleSubmit}>
                                {inputs.map((input) => (
                                    <Register placeholder="Username"
                                        key={input.id} {...input}
                                        value={values[input.name]}
                                        onChange={onChange} />
                                ))}
                                <button onClick={handleSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )

}
