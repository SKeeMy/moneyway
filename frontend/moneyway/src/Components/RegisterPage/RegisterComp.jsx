import React from 'react'
import Register from './Register';
import styles from './RegisterComp.module.css'
import { useState } from 'react';
import Tilt from 'react-parallax-tilt'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Loading from '../../utils/Loading/Loading';






export default function RegisterComp() {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        login: "",
        email: "",
        password: "",
        age: ""
    });



    const inputs = [
        {
            id: 1,
            name: "login",
            type: "text",
            placeholder: "Login",
            errorMsg: "Username should be 3-16 characters and shouldn't include any special character!",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMsg: "It should be valid email",
            required: true
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMsg: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
            pattern: `^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true
        },
        {
            id: 4,
            name: "ConfirmPassword",
            type: "password",
            placeholder: "Confirm password",
            errorMsg: "Passwords don't match",
            pattern: values.password,
            required: true
        },
        {
            id: 5,
            name: "age",
            type: "number",
            placeholder: "Your age",
            errorMsg: "Only numbers bigger zero",
            pattern: `^([0-9]|([1-9][0-9])|100)$`,
            required: true,
        }
    ]



    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();
    const routeHandler = () => {
        navigate('/login');
    }


    function sendAPI(values) {
        setLoading(true)
        axios.post('http://backend/api/registration', values)
            .then(res => {
                console.log('Response from API: ', res);
                if (res.status === 201) {
                    setLoading(false)
                    navigate('/login')
                }
                if (res.status === 204) {
                    setLoading(false)
                    alert('Some error! Try to write this again')
                    navigate('/')
                }
            })
            .catch(error => {
                alert('Oops, some error here: ' + error)
                console.error('Error while sending data:', error)
                setLoading(false)
                navigate('/')
            });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendAPI(values)

    }
    if (loading === false)
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
                            <div onClick={routeHandler} className={styles['login']}>Already have an account?</div>
                            <h1>Registration</h1>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {inputs.map((input) => (
                                <Register placeholder="Username"
                                    key={input.id} {...input}
                                    value={values[input.name]}
                                    onChange={onChange} />
                            ))}

                            <button onClick={handleSubmit} >Submit</button>
                        </form>

                    </div>
                </Tilt>
            </div>

        )
    else return <Loading />
}
