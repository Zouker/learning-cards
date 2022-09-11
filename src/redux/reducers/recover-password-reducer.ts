import {AxiosError} from 'axios'
import {recoverPasswordAPI, recoverPasswordDataType} from '../../api/recoverPasswordAPI'
import {AppThunk} from '../store'
import {setAppStatusAC} from './app-reducer'
import {errorUtils} from '../../utils/error-utils';

const initialState = {
    isPasswordChanged: false,
    newPassword: ''
}

export const recoverPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'recover/RECOVER-PASSWORD':
            return {...state, newPassword: action.newPassword}
        case 'recover/PASSWORD_CHANGED':
            return {...state, isPasswordChanged: action.isPasswordChanged}
        default:
            return state
    }
}

// thunks
export const recoverPasswordTC = (data: recoverPasswordDataType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        recoverPasswordAPI.setNewPass(data)
            .then((res) => {
                dispatch(recoverPasswordAC(res.data.info))
                dispatch(passwordChangedAC(true))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('idle'))
            })
    }
}

// actions
export const recoverPasswordAC = (newPassword: string) => ({type: 'recover/RECOVER-PASSWORD', newPassword} as const)
export const passwordChangedAC = (isPasswordChanged: boolean) => ({
    type: 'recover/PASSWORD_CHANGED',
    isPasswordChanged
} as const)

// types
type InitialStateType = typeof initialState
export type ActionsType = ReturnType<typeof recoverPasswordAC> | ReturnType<typeof passwordChangedAC>