import React from 'react'
import Register from '../RegisterPage/Register';
import styles from './Login.module.css'
import { useState } from 'react';
import Tilt from 'react-parallax-tilt'
import { useNavigate } from 'react-router-dom';




export default function RegisterComp() {
    const [values, setValues] = useState({
        login: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: ""
    });

    const inputs = [
        {
            id: 1,
            name: "login",
            type: "text",
            placeholder: "Login",

        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
        },

    ]

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate();
    const routeHandler = () => {
        navigate('/');
    }
    console.log(values);
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

                        <button >Submit</button>
                    </form>

                </div>
            </Tilt>
        </div>
    )
}
