import React from 'react';
import styles from './CheckEmail.module.css'
import Email from '../../../assets/img/email.png'
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../../bll/store';

export const CheckEmail = () => {
    const navigate = useNavigate();
    const email = useAppSelector(state => state.forgotPassword.email)
    const handleSubmit = () => {
        navigate('/login', {replace: true});
    }
    return (
        <div className={styles.checkEmailWrapper}>
            <div className={styles.checkEmailContainer}>
                <div className={styles.title}>Check Email</div>
                <img src={Email} alt="check email img" className={styles.checkEmailImage}/>
                <div className={styles.text}>We've sent an Email with instructions to {email}</div>

                <Button onClick={handleSubmit} variant="contained">Back to login</Button>
            </div>
        </div>
    );
};