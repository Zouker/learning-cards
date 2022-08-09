import React from 'react';
import style from './CheckEmail.module.css'
import email from '../../../assets/img/email.png'
import {Button} from '@mui/material';
import {Navigate, useNavigate} from 'react-router-dom';
import { useAppSelector } from '../../../bll/store';

const CheckEmail = () => {
    const navigate = useNavigate();
    const em = useAppSelector(state => state.forgotPassword.email)
    const handleSubmit = () => {
        navigate("/login", { replace: true });
    }
    return (
        <div className={style.checkEmailWrapper}>
            <div className={style.checkEmailContainer}>
                <h1>Check Email</h1>
                <img src={email} alt=""/>
                <div className={style.text}>We've sent an Email with instructions to {em}</div>

                <Button onClick={handleSubmit} variant="contained">Back to login</Button>
            </div>
        </div>
    );
};

export default CheckEmail;