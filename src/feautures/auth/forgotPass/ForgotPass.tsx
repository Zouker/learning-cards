import {Button, TextField} from '@mui/material';
import React from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import { forgotPassTC } from '../../../bll/reducers/forgot-password-reducer';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import style from './ForgotPass.module.css'

export const ForgotPass = () => {
    const dispatch = useAppDispatch()
    const isSent = useAppSelector(state => state.forgotPassword.isSent)
    const [email, setEmail] = React.useState<string>('')

    const data = {
        email: email,
        from: "test-front-admin <ai73a@yandex.by>",
        message: 'Hello'
    }
    const cb = () => {
        dispatch(forgotPassTC(data, email))
    }
    if (isSent) {
        return <Navigate to={'/checkEmail'}/>
    }

    const onChangeHandler = (e: any) => {
        setEmail(e.currentTarget.value)

    }
    return (
        <div className={style.forgotPassWrapper}>
            <div className={style.forgotPassContainer}>
                <h1>Forgot your password?</h1>
                <TextField
                    className={style.textfield}
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    onChange={onChangeHandler}
                    value={email}
                />

                <div className={style.text}>Enter your email address and we will send you further instructions</div>
                <Button onClick={cb} variant="contained">Send Instructions</Button>
                <div className={style.question}>Did you remember your password?</div>
                <NavLink to={'/login'} className={({isActive}) => isActive ? style.active : style.try}>Try logging
                    in</NavLink>
            </div>
        </div>
    );
};
