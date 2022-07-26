import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';

export const Login = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }

        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            //dispatch(loginTC(values));
        },
    })

    // if (isLoggedIn) {
    //     return <Redirect to={"/"} />
    // }
    return (
        <div>

        </div>
    );
};
