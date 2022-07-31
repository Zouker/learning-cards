import React from 'react';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import {Error404} from '../common/error-page/Error404';
import {Login} from '../feautures/auth/login/Login';
import {Register} from '../feautures/auth/register/Register';
import {Profile} from '../feautures/auth/profile/Profile';
import {Packs} from '../feautures/packs/Packs';

export const RoutesPage = () => {
    return (
        <>
            <NavLink to={'/login'}>Login</NavLink> |
            <NavLink to={'/register'}> Register</NavLink> |
            <NavLink to={'/profile'}> Profile</NavLink>|
            <NavLink to={'/forgotPassword'}> Forgot Password</NavLink> |
            <NavLink to={'/recoverPassword'}> Recover Password</NavLink> |
            <NavLink to={'/packs'}> Packs</NavLink>

            <Routes>
                <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/forgotPassword'} element={<div>Forgot Password</div>}/>
                <Route path={'/recoverPassword'} element={<div>Recover Password</div>}/>
                <Route path={'/packs'} element={<Packs/>}/>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </>
    );
};