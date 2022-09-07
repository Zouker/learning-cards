import {AxiosResponse} from 'axios';
import {instance} from './instance/instance';

export const forgotPassAPI = {
    forgotPass(data: ForgotPassDataType) {
        return instance.post<ForgotPassDataType, AxiosResponse<ForgotPassResponseDataType>>('/auth/forgot', data);
    }
}

// types
export type ForgotPassDataType = {
    email: string
    message: string
}

type ForgotPassResponseDataType = {
    info: string
    error: string
}