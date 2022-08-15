import {useFormik} from 'formik';
import React, {useState} from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    Input,
    InputAdornment,
    InputLabel
} from '@mui/material'
import {loginTC} from './login-reducer';
import styles from './Login.module.css';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate, NavLink} from 'react-router-dom';

export const Login = () => {

    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 7) {
                errors.password = 'Password must be more than 7 characters...';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
        },
    })
    const [passwordValues, setPasswordValues] = useState({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setPasswordValues({
            ...passwordValues,
            showPassword: !passwordValues.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isLoggedIn) {
        return <Navigate to={'/packs'}/>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Sign In</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.form}>
                        <FormControl sx={{m: 1, width: '40ch'}} variant="standard">
                            <InputLabel htmlFor="email">E-mail</InputLabel>
                            <Input
                                id="email"
                                type={'email'}
                                {...formik.getFieldProps('email')}
                            />
                        </FormControl>
                        {formik.errors.email && formik.touched.email &&
                            <div className={styles.error}>{formik.errors.email}</div>}
                        <FormControl sx={{m: 1, width: '40ch'}} variant="standard">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type={passwordValues.showPassword ? 'text' : 'password'}
                                {...formik.getFieldProps('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {passwordValues.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {formik.errors.password && formik.touched.password &&
                            <div className={styles.error}>{formik.errors.password}</div>}
                        <FormControlLabel
                            className={styles.rememberMe}
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <div className={styles.forgotPassword}>
                            <NavLink to={'/forgotPassword'}>Forgot Password?</NavLink>
                        </div>
                        <div className={styles.buttonBlock}>
                            <Button className={styles.button}
                                    type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}>Sign In</Button>
                        </div>
                        <div className={styles.haveAc}>Don't have an account?</div>
                        <NavLink to={'/register'}>Sign Up</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
};

// types

type FormikErrorType = {
    email?: string,
    password?: string
}