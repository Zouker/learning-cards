import React, {useEffect, useState} from 'react';
import './App.css';
import {RoutesPage} from './routes/RoutesPage';
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar';
import {Button, CircularProgress, LinearProgress} from '@mui/material';
import {useAppDispatch, useAppSelector} from './bll/store';
import {initializeAppTC} from './feautures/auth/login/login-reducer';
import {DeletePackModal} from "./feautures/modals/modals-packs/DeletePackModal";


function App() {
    const[isDeletePackModalOpen, setIsDeletePackModalOpen] = useState<boolean>(false)
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


    const deleteModalHandler = () => {
        setIsDeletePackModalOpen(!isDeletePackModalOpen)
    }


    return (
        <div className="App">
            <div>
                {status === 'loading' && <LinearProgress/>}
                <ErrorSnackbar/>
                <RoutesPage/>
            </div>
            <div className="controls">
                <Button variant="contained" onClick={deleteModalHandler}>Open first modal</Button>
                <Button variant="contained">Open second modal</Button>
                <Button variant="contained">Open third modal</Button>
            </div>
           <DeletePackModal isModalOpen={isDeletePackModalOpen} setIsModalOpen={deleteModalHandler}/>
        </div>

    );
}

export default App;
