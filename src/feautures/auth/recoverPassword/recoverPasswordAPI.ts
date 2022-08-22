import {AxiosResponse} from 'axios';
import {instance} from '../../../instance/instance';

export const recoverPasswordAPI = {
    setNewPass(data: recoverPasswordDataType) {
        return instance.post<recoverPasswordDataType, AxiosResponse<SetNewPassResponseDataType>>('/auth/set-new-password', data);
    }
}

// types
export type recoverPasswordDataType = {
    password: string
    resetPasswordToken: string
}

type SetNewPassResponseDataType = {
    info: string
    error: string
}