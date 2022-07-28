import {AppThunk} from "../store";
import {profileAPI} from "../../feautures/auth/profile/profileAPI";
import {errorUtils} from "../../utils/error-utils";
import {AxiosError} from "axios";


const initialState = {_id: '', name: 'Your name', avatar: '', email: ''}


export const profileReducer = (state: { name: string; _id: string; avatar: string; email: string } = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CHANGE-USER-NAME': {
            return {...state, ...action.userData}
        }
        default:
            return state
    }
}


export type changeUserDataActionType = ReturnType<typeof changeUserDataAC>;
export const changeUserDataAC = (userData: UpdatedUserType) => ({
    type: 'CHANGE-USER-NAME',
       userData
} as const)

// thunk

export const updateUserDataTC = (userData: UpdatedUserType): AppThunk => (dispatch) => {
    profileAPI.changeUserData(userData)
        .then((res) => {
            dispatch(changeUserDataAC(res.data.updatedUser))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })


}


//types:

type InitialStateType = typeof initialState

type ActionsType = changeUserDataActionType

export type ResponceDataType = {
    updatedUser: UpdatedUserType
    error?: string
}

export type UpdatedUserType ={
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}