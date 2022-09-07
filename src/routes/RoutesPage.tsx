import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from '../common/error-page/Error404';
import {Login} from '../feautures/auth/login/Login';
import {Register} from '../feautures/auth/register/Register';
import {Profile} from '../feautures/auth/profile/Profile';
import {Packs} from '../feautures/packs/Packs';
import {Cards} from '../feautures/cards/Cards';
import {Learn} from '../feautures/learn/Learn';
import {ForgotPass} from '../feautures/auth/forgotPass/ForgotPass';
import {RecoverPassword} from '../feautures/auth/recoverPassword/RecoverPassword';
import {CheckEmail} from '../feautures/auth/checkEmail/CheckEmail';
import {useAppSelector} from '../redux/store';

export const RoutesPage = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

    return (
        <>
            <Routes>
                <Route path={'/'} element={isLoggedIn ? <Navigate to={'/packs'}/> :
                    <Navigate to={'/login'}/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/forgot-password'} element={<ForgotPass/>}/>
                <Route path={'/check-email'} element={<CheckEmail/>}/>
                <Route path={'/set-new-password/:token'} element={<RecoverPassword/>}/>
                <Route path={'/packs'} element={<Packs/>}/>
                <Route path={'/cards/:packId/:packName'} element={<Cards/>}/>
                <Route path={'/learn/:packId/:packName'} element={<Learn/>}/>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </>
    );
};