import React from 'react';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import {Error404} from '../common/error-page/Error404';
import { Login } from '../feautures/auth/login/Login';
import {Register} from '../feautures/auth/register/Register';
import {Profile} from "../feautures/auth/profile/Profile";
import style from './RoutesPage.module.css'

export const RoutesPage = () => {

    return (
        <>
            <NavLink to={'/login'} className={({isActive}) => isActive ? style.active : ''}>Login</NavLink> |
            <NavLink to={'/register'} className={({isActive}) => isActive ? style.active : ''}> Register</NavLink> |
            <NavLink to={'/'} className={({isActive}) => isActive ? style.active : ''}> Profile</NavLink>|
            <NavLink to={'/forgotPassword'} className={({isActive}) => isActive ? style.active : ''}> Forgot Password</NavLink> |
            <NavLink to={'/recoverPassword'} className={({isActive}) => isActive ? style.active : ''}> Recover Password</NavLink>

            <Routes>
                <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                <Route path={'/login'} element={<div><Login/></div>}/>
                <Route path={'/register'} element={<div><Register/></div>}/>
                <Route path={'/profile'} element={<div><Profile/></div>}/>
                <Route path={'/forgotPassword'} element={<div>Forgot Password</div>}/>
                <Route path={'/recoverPassword'} element={<div>Recover Password</div>}/>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                //hello
            </Routes>
        </>
    );
};