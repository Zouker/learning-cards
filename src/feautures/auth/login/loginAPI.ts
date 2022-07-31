import {instance} from '../../../instance/instance';

export const loginAPI = {
    login(data: LoginDataType) {
        return instance.post('/auth/login', data);
    },
    me() {
        return instance.post('/auth/me');
    },
    logout() {
        return instance.delete('/auth/me')
    }
}

// types
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}