import {AppThunk} from '../store';
import {setAppStatusAC} from './app-reducer';
import {errorUtils} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {forgotPassAPI, ForgotPassDataType} from '../../api/forgotPassAPI';

const initialState = {
    isSent: false,
    email: ''
}

export const forgotPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'forgot/SENT':
            return {...state, isSent: action.isSent, email: action.email}
        default:
            return state
    }
}

// thunks
export const forgotPassTC = (data: ForgotPassDataType, email: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        forgotPassAPI.forgotPass(data)
            .then((res) => {
                dispatch(forgotPassAC(true, email))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('idle'))
                dispatch(forgotPassAC(false, email))
            })
    }
}

// actions
export const forgotPassAC = (isSent: boolean, email: string) => ({
    type: 'forgot/SENT',
    isSent,
    email
} as const)

// types
type InitialStateType = typeof initialState
export type ActionsType = ReturnType<typeof forgotPassAC>