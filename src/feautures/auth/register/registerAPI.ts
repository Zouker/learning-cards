import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0',
    withCredentials: true,
})

export const registerAPI = {
    register(data: RegisterDataType) {
        return instance.post('/auth/register', data);
    }
}

// types
export type RegisterDataType = {
    email: string
    password: string
}