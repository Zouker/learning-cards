import React, {useEffect} from 'react';
import './App.module.css';
import {RoutesPage} from './routes/RoutesPage';
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar';
import {CircularProgress, LinearProgress} from '@mui/material';
import {useAppDispatch, useAppSelector} from './bll/store';
import {initializeAppTC} from './feautures/auth/login/login-reducer';
import styles from './App.module.css'

function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.login.isInitialized)
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div className={styles.preloader}><CircularProgress/></div>
    }

    return (
        <div className={styles.App}>
            <div>
                {status === 'loading' && <LinearProgress/>}
                <ErrorSnackbar/>
                <RoutesPage/>
            </div>
        </div>

    );
}

export default App;
