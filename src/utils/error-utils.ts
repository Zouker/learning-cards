import axios, {AxiosError} from 'axios';
import {Dispatch} from 'redux';
import {setAppErrorAC} from '../bll/reducers/app-reducer';

export const errorUtils = (e: Error | AxiosError<{error: string}>, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
}