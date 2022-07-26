import axios from 'axios'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})


export const loginAPI = {
    register(data: LoginDataType) {
        return instance.post('/auth/login', data);
    }
}

// types
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}