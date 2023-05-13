import React from 'react'
import styles from './Register.module.css'
import { useState } from 'react';


export default function Register(props) {
    const { label, onChange, id, errorMsg, ...inputProps } = props;
    const [focused, setFocused] = useState(false);
    const handleFocus = (e) => {
        setFocused(true);
    };
    return (
        <div className={styles['InputBlock']}>
            <label>{label}</label>
            <input className={styles['inputs']}
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)}
                focused={focused.toString()} />
            <span>{errorMsg}</span>
        </div>
    )
}
