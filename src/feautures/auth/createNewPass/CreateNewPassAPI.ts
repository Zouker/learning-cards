import {AxiosResponse} from 'axios';
import {instance} from '../../../instance/instance';

export const setNewPassAPI = {
    setNewPass(data: SetNewPassType) {
        return instance.post<SetNewPassType, AxiosResponse<SetNewPassResponseDataType>>('/auth/set-new-password', data);
    }
}

// types
export type SetNewPassType = {
    password: string
    resetPasswordToken:string
}

type SetNewPassResponseDataType = {
    info: string
    error: string
}