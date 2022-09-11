import {registerAPI, RegisterDataType} from '../../api/registerAPI';
import {AppThunk} from '../store';
import {setAppStatusAC} from './app-reducer';
import {errorUtils} from '../../utils/error-utils';
import {AxiosError} from 'axios';

const initialState = {
    isRegistered: false
}

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTER':
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}

// thunks
export const registerTC = (data: RegisterDataType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        registerAPI.register(data)
            .then((res) => {
                dispatch(registerAC(true))
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
export const registerAC = (isRegistered: boolean) => ({type: 'REGISTER', isRegistered} as const)

// types
type InitialStateType = typeof initialState
export type ActionsType = ReturnType<typeof registerAC>