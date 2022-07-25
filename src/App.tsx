import React from 'react';
import './App.css';
import {RoutesPage} from './routes/RoutesPage';
import {ErrorSnackbar} from './components/ErrorSnackbar/ErrorSnackbar';
import {LinearProgress} from '@mui/material';
import {useAppSelector} from './bll/store';

function App() {
    const status = useAppSelector(state => state.app.status)
    return (
        <div className="App">
            {status === 'loading' && <LinearProgress/>}
            <ErrorSnackbar/>
            <RoutesPage/>
        </div>
    );
}

export default App;
