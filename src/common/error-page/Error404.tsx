import React from 'react';
import error404 from '../../assets/img/404.gif'

export const Error404 = () => {
    return (
        <div>
            <img src={error404} alt={'Page not found'}/>
        </div>
    );
};