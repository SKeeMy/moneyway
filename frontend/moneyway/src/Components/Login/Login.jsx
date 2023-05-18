import React from 'react'
import Register from '../RegisterPage/Register';
import styles from './Login.module.css'
import { useState } from 'react';
import Tilt from 'react-parallax-tilt'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




export default function RegisterComp() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",

        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
        },

    ]


    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate();
    const routeHandler = () => {
        navigate('/');
    }




    function sendAPI(values) {
        axios.post('http://backend//api/login', values)
            .then(res => {
                const token = res.data.remember_token
                console.log('Response from API: ', token);
                localStorage.setItem(values.email, token);

                if (res.status === 200) {
                    navigate('/Layout')
                }
            })
            .catch(error => {
                alert('Oops, some error here: ' + error)
                console.error('Error while sending data:', error)
            });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendAPI(values);
    }


    return (
        <div className={styles['bg']}>
            <div className={styles['cicle']}></div>
            <div className={styles['cicle']}></div>
            <div className={styles['cicle']}></div>
            <div className={styles['cicle']}></div>
            <div className={styles['cicle']}></div>
            <div className={styles['cicle']}></div>
            <div className={styles['cicle']}></div>
            <div className={styles['cicle']}></div>
            <div className={styles['cicle']}></div>
            <div className={styles['cicle']}></div>

            <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2}>
                <div className={styles['Registration']}>

                    <div className={styles['title']}>
                        <img src="logo.png" alt="Logotype" />
                        <div onClick={routeHandler} className={styles['login']}>Don't have an account?</div>
                        <h1>Log in</h1>
                    </div>

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
            </Tilt>
        </div>
    )
}
