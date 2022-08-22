import {Visibility, VisibilityOff} from '@mui/icons-material';
import {Button, FormControl, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {useFormik} from 'formik';
import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {recoverPasswordTC} from '../../../bll/reducers/recover-password-reducer';
import {useAppDispatch} from '../../../bll/store';
import style from './RecoverPassword.module.css'

export const RecoverPassword = () => {
    const {token} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 7) {
                errors.password = 'Password must be more than 7 characters...';
            }

            return errors;
        },
        onSubmit: values => {
            token && dispatch(recoverPasswordTC({password: values.password, resetPasswordToken: token}))
            navigate('/login')
        },
    });

    return (
        <div className={style.createNewPassWrapper}>
            <form className={style.createNewPassContainer} onSubmit={formik.handleSubmit}>
                <h1>Create new password</h1>

                <FormControl className={style.formControl} sx={{m: 1, width: '40ch'}} variant="standard">
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

                <div className={style.text}>
                    Create new password and we will send you futher instructions to email
                </div>
                <Button variant="contained" type={'submit'}>Create new password</Button>
            </form>
        </div>
    );
};

// types
type FormikErrorType = {
    email?: string
    password?: string
}
