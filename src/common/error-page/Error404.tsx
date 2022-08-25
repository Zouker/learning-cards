import React from 'react';
import error404 from '../../assets/img/404.gif'
import styles from './Error404.module.css'
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export const Error404 = () => {
    const navigate = useNavigate()
    const onClickHandler = () => {
        navigate('/login')
    }

    return (
        <div className={styles.container}>
            <div><img src={error404} alt={'Page not found'}/></div>
            <Button variant={'contained'} color={'primary'} onClick={onClickHandler}>Back to home page</Button>
        </div>
    );
};