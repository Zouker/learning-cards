import axios from 'axios';
import {UserDataType} from "../../../bll/reducers/profile-reducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const profileAPI = {
    updateUserData(params: UserDataType) {
        return instance.put('auth/me', params)
    }
};

// types
export type UpdateUserParamsType = {
    name: string
    avatar: string
}