import React from 'react';
import error404 from '../../assets/img/404.gif'
import styles from './Error404.module.css'

export const Error404 = () => {
    return (
        <div className={styles.container}>
            <img src={error404} alt={'Page not found'}/>
        </div>
    );
};