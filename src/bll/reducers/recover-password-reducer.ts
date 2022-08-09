import { AxiosError } from "axios"
import {setNewPassAPI, SetNewPassType } from "../../feautures/auth/createNewPass/CreateNewPassAPI"
import { AppThunk } from "../store"
import { setAppStatusAC } from "./app-reducer"
import {errorUtils} from '../../utils/error-utils';

const initialState = {
    isSent: false,
    email: ''
}

export const recoverPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

// thunks
export const setNewPassTC = (data: SetNewPassType): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        setNewPassAPI.setNewPass(data)
            .then((res) => {
                dispatch(setAppStatusAC('loading'))

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
export const setNewPassPassAC = () => ({type: 'setNewPass/SET'} as const)

// types
type InitialStateType = typeof initialState
export type ActionsType = ReturnType<typeof setNewPassPassAC>