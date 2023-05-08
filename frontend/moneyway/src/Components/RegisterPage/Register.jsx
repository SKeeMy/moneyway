import React from 'react'
import styles from './Register.module.css'

export default function Register() {
    return (
        <div className={[styles]}>
            <label >Username</label>
            <input placeholder='username' type="text" />
            <label >E-mail</label>
            <input placeholder='e-mail' type="email" />
            <label >Password</label>
            <input placeholder='password' type="password" />
            <label >Repeat password</label>
            <input placeholder='repeat password' type="password" />
            <label >Your age</label>
            <input placeholder='age' type="number" />
        </div>
    )
}
