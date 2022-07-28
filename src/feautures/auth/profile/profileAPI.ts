import axios from 'axios';
import {UpdatedUserType} from "../../../bll/reducers/profile-reducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const profileAPI = {
    changeUserData: function (data: UpdatedUserType) {
        return instance.put('/auth/me', data);
    },
    // logout() {
    //     return instance.delete('auth/me');
    // }
}