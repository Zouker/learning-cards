import React from 'react';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import {Error404} from '../common/error-page/Error404';
import {Register} from '../feautures/auth/register/Register';

export const RoutesPage = () => {
    return (
        <>
            <NavLink to={'/login'}>Login</NavLink> |
            <NavLink to={'/register'}> Register</NavLink> |
            <NavLink to={'/profile'}> Profile</NavLink>|
            <NavLink to={'/forgotPassword'}> Forgot Password</NavLink> |
            <NavLink to={'/recoverPassword'}> Recover Password</NavLink>

            <Routes>
                <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                <Route path={'/login'} element={<div>Login</div>}/>
                <Route path={'/register'} element={<div><Register/></div>}/>
                <Route path={'/profile'} element={<div>Profile</div>}/>
                <Route path={'/forgotPassword'} element={<div>Forgot Password</div>}/>
                <Route path={'/recoverPassword'} element={<div>Recover Password</div>}/>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </>
    );
};