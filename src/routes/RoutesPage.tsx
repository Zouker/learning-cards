import React from 'react';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import {Error404} from '../common/error-page/Error404';
import {Login} from '../feautures/auth/login/Login';
import {Register} from '../feautures/auth/register/Register';
import {Profile} from '../feautures/auth/profile/Profile';
import {Packs} from '../feautures/packs/Packs';
import style from './RoutesPage.module.css'
import {Cards} from '../feautures/cards/Cards';
import {Learn} from '../feautures/learn/Learn';

export const RoutesPage = () => {
    return (
        <>
            <NavLink to={'/login'} className={({isActive}) => isActive ? style.active : ''}>Login</NavLink> |
            <NavLink to={'/register'} className={({isActive}) => isActive ? style.active : ''}> Register</NavLink> |
            <NavLink to={'/profile'} className={({isActive}) => isActive ? style.active : ''}> Profile</NavLink>|
            <NavLink to={'/forgotPassword'} className={({isActive}) => isActive ? style.active : ''}> Forgot
                Password</NavLink> |
            <NavLink to={'/recoverPassword'} className={({isActive}) => isActive ? style.active : ''}> Recover
                Password</NavLink> |
            <NavLink to={'/packs'} className={({isActive}) => isActive ? style.active : ''}> Packs</NavLink>

            <Routes>
                <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/forgotPassword'} element={<div>Forgot Password</div>}/>
                <Route path={'/recoverPassword'} element={<div>Recover Password</div>}/>
                <Route path={'/packs'} element={<Packs/>}/>
                <Route path={'/cards/:packId/:packName'} element={<Cards/>}/>
                <Route path={'/learn/:packId/:packName'} element={<Learn/>}/>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </>
    );
};