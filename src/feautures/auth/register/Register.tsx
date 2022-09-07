import React, {useState} from 'react';
import {useFormik} from 'formik';
import {Navigate, NavLink} from 'react-router-dom';
import {registerTC} from '../../../redux/reducers/register-reducer';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from './Register.module.css'

export const Register = () => {
    const dispatch = useAppDispatch()
    const isRegistered = useAppSelector(state => state.register.isRegistered)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
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
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'The password and confirmation password do not match';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(registerTC(values))
        },
    });


    const [passwordValues, setPasswordValues] = useState<passwordType>({
        password: '',
        showPassword: false,
    });

    const [confirmPasswordValues, setConfirmPasswordValues] = useState<confirmPasswordType>({
        confirmPassword: '',
        showConfirmPassword: false,
    });

    const handleClickShowPassword = () => {
        setPasswordValues({
            ...passwordValues,
            showPassword: !passwordValues.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setConfirmPasswordValues({
            ...confirmPasswordValues,
            showConfirmPassword: !confirmPasswordValues.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isRegistered) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Sign Up</h1>
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
                        <FormControl sx={{m: 1, width: '40ch'}} variant="standard">
                            <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                            <Input
                                id="confirmPassword"
                                type={confirmPasswordValues.showConfirmPassword ? 'text' : 'password'}
                                {...formik.getFieldProps('confirmPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {confirmPasswordValues.showConfirmPassword ? <VisibilityOff/> :
                                                <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                            <div className={styles.error}>{formik.errors.confirmPassword}</div>}
                    </div>
                    <div className={styles.buttonBlock}>
                        <Button variant={'contained'}
                                type="submit"
                                className={styles.button}>Sign Up</Button>
                    </div>
                </form>
                Already have an account?
                <div>
                    <NavLink to={'/login'}>Sign In</NavLink>
                </div>
            </div>
        </div>
    );
};

// types

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

type passwordType = {
    password: string;
    showPassword: boolean;
}

type confirmPasswordType = {
    confirmPassword: string;
    showConfirmPassword: boolean;
}

