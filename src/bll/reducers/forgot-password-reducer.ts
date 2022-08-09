import {registerAPI, RegisterDataType} from '../../feautures/auth/register/registerAPI';
import {AppThunk} from '../store';
import {setAppStatusAC} from './app-reducer';
import {errorUtils} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {forgotPassAPI, ForgotPassDataType } from '../../feautures/auth/forgotPass/forgotPassAPI';

const initialState = {
    isSent: false
}

export const forgotPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'forgot/SENT':
            return {...state, isSent: action.isSent}
        default:
            return state
    }
}

// thunks
export const forgotPassTC = (data: ForgotPassDataType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        forgotPassAPI.forgotPass(data)
            .then((res) => {
                dispatch(forgotPassAC(true))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('idle'))
                dispatch(forgotPassAC(false))
            })
    }
}

// actions
export const forgotPassAC = (isSent: boolean) => ({type: 'forgot/SENT', isSent} as const)

// types
type InitialStateType = typeof initialState
export type ActionsType = ReturnType<typeof forgotPassAC>