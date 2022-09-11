import {AppThunk} from '../store';
import {AxiosError} from 'axios';
import {errorUtils} from '../../utils/error-utils';
import {profileAPI} from '../../api/profileAPI';
import defaultUser from '../../assets/img/user.svg'

const initialState = {
    _id: '',
    email: '',
    name: 'Enter name',
    publicCardPacksCount: 0,
    avatar: defaultUser
}

export const profileReducer = (state: UserDataType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'profile/SET-USER-DATA': {
            return {...state, ...action.userData}
        }
        default:
            return state
    }
}

// thunks
export const updateUserDataTC = (userData: UserDataType): AppThunk => (dispatch) => {
    profileAPI.updateUserData(userData)
        .then((res) => {
            dispatch(setUserDataAC(res.data.updatedUser))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
}

// actions
export const setUserDataAC = (userData: UserDataType) => ({
    type: 'profile/SET-USER-DATA',
    userData
} as const)

// types
type InitialStateType = typeof initialState

type ActionType = ReturnType<typeof setUserDataAC>

export type UpdateResponseType = {
    updatedUser: UserDataType
    token: string
    tokenDeathTime: string
}

export type UserDataType = {
    _id: string
    email: string
    rememberMe?: boolean
    isAdmin?: boolean
    name: string
    verified?: boolean
    publicCardPacksCount: number
    created?: Date
    updated?: Date
    __v?: number
    token?: string
    tokenDeathTime?: number
    avatar: string
}