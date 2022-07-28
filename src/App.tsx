import React, {useEffect} from 'react';
import './App.css';
import {RoutesPage} from './routes/RoutesPage';
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar';
import {CircularProgress, LinearProgress} from '@mui/material';
import {useAppDispatch, useAppSelector} from './bll/store';
import {initializeAppTC} from './feautures/auth/login/login-reducer';

function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.login.isInitialized)
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            {status === 'loading' && <LinearProgress/>}
            <ErrorSnackbar/>
            <RoutesPage/>
        </div>
    );
}

export default App;
