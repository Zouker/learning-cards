import {AxiosResponse} from 'axios';
import {instance} from '../../../instance/instance';

export const registerAPI = {
    register(data: RegisterDataType) {
        return instance.post<RegisterDataType, AxiosResponse<RegisterResponseDataType>>('/auth/register', data);
    }
}

// types
export type RegisterDataType = {
    email: string
    password: string
}

type RegisterResponseDataType = {
    id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
}