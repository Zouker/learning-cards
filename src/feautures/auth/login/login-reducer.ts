import {Dispatch} from 'redux'
import {loginAPI, LoginDataType} from "./loginAPI";
import {AxiosError} from "axios";
import {errorUtils} from "../../../utils/error-utils";
import {setAppStatusAC} from "../../../bll/reducers/app-reducer";
import {Navigate} from "react-router-dom";
import React from "react";

const initialState: InitialStateType = {
    isLoggedIn: false,
    isInitialized: false
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'APP/SET-IS-INITIALIED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIED', value} as const)

//thunks
export const loginTC = (data: LoginDataType) => (dispatch: Dispatch<ActionsType>) => {
    //dispatch(setAppStatusAC('loading'))
    loginAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            //handleServerAppError(res.data, dispatch)
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            //dispatch(setAppStatusAC('idle'))
        })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    loginAPI.me()
        .then(res => {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppInitializedAC(true));
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
}

//types
type InitialStateType = {
    isLoggedIn: boolean,
    isInitialized: boolean
}
type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setAppInitializedAC>