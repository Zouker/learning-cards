import {loginAPI, LoginDataType} from './loginAPI';
import {AxiosError} from 'axios';
import {errorUtils} from '../../../utils/error-utils';
import {setAppStatusAC} from '../../../bll/reducers/app-reducer';
import {AppThunk} from '../../../bll/store';

const initialState: InitialStateType = {
    isLoggedIn: false,
    isInitialized: false
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'SET-IS-LOGGED-IN', value} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'SET-IS-INITIALIZED', value} as const)

//thunks
export const loginTC = (data: LoginDataType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    loginAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}
export const initializeAppTC = (): AppThunk => (dispatch) => {
    loginAPI.me()
        .then(res => {
            dispatch(setIsLoggedInAC(true));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppInitializedAC(true));
        })
}

//types
type InitialStateType = {
    isLoggedIn: boolean,
    isInitialized: boolean
}
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setAppInitializedAC>