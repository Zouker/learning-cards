import {Button, TextField } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './ForgotPass.module.css'

export const ForgotPass = () => {
    return (
        <div className={style.forgotPassWrapper}>
            <div className={style.forgotPassContainer}>
                <h1>Forgot your password?</h1>
                <TextField className={style.textfield} id="standard-basic" label="Email" variant="standard" />
                <div className={style.text}>Enter your email address and we will send you further instructions </div>
                <Button variant="contained">Send Instructions</Button>
                <div className={style.question}>Did you remember your password?</div>
                <NavLink to={'/login'} className={({isActive}) => isActive ? style.active : style.try}>Try logging in</NavLink>
            </div>
        </div>
    );
};
