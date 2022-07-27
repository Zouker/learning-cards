import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const profileAPI = {
    getProfileInfo() {
        return instance.post('/auth/me');
    },
    updateProfile(data: UpdateProfileType) {
        return instance.put('/auth/me', data);
    },
    logout() {
        return instance.delete('auth/me');
    }
}

// types
export type UpdateProfileType = {
    email: string
    avatar: string
}