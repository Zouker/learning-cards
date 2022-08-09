import {Visibility, VisibilityOff} from '@mui/icons-material';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField} from '@mui/material';
import {useFormik} from 'formik';
import React from 'react';
import style from './CreateNewPass.module.css'

type FormikErrorType = {
    email?: string
    password?: string
}

export const CreateNewPass = () => {

    const [passwordValues, setPasswordValues] = React.useState({
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

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
            // dispatch(registerTC(values))
        },
    });
    return (
        <div className={style.createNewPassWrapper}>
            <div className={style.createNewPassContainer}>
                <h1>Create new password</h1>

                <FormControl className={style.formControl} sx={{m: 1, width: '40ch'}} variant="standard">
                    <InputLabel  htmlFor="password">Password</InputLabel>
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

                <div className={style.text}>
                    Create new password and we will send you futher instructions to email
                </div>
                <Button variant="contained">Create new password</Button>
            </div>
        </div>
    );
};
