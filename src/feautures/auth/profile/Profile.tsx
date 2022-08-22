import React from 'react';
import style from './Profile.module.css'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import {Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {EditableSpan} from './EditableSpan';
import {updateUserDataTC} from '../../../bll/reducers/profile-reducer';
import {useNavigate} from 'react-router-dom';
import {logoutTC} from '../../../bll/reducers/login-reducer';

type ProfilePropsType = {
    title?: string
    changeTitle?: (title: string) => void
    disabled?: boolean
    activateEditMode?: () => void
}

export const Profile: React.FC<ProfilePropsType> = () => {
    const publicCardPacksCount = useAppSelector(state => state.profile.publicCardPacksCount)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const userName = useAppSelector(state => state.profile.name)
    const userId = useAppSelector(state => state.profile._id)
    const email = useAppSelector(state => state.profile.email)
    const userAvatar = useAppSelector(state => state.profile.avatar)

    const navigate = useNavigate();

    const dispatch = useAppDispatch()


    const changeUserName = (name: string) => {
        dispatch(updateUserDataTC({
            publicCardPacksCount: publicCardPacksCount,
            _id: userId,
            name: name,
            avatar: userAvatar,
            email
        }))
    }

    if (!isLoggedIn) {
        navigate('/login')
    }

    return (
        <div className={style.profileWrapper}>
            <div onClick={() => navigate('/packs')} className={style.profileBackTo}>
                <ArrowBackIcon/><span>{'Back to Packs List'}</span></div>
            <div className={style.profileContainer}>
                <div className={style.profileHeader}>Personal Information</div>
                <Badge
                    overlap="circular"
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    badgeContent={
                        <PhotoCameraIcon color={'primary'} onClick={() => alert('Save New Avatar')}/>
                    }
                >
                    <Avatar alt="User"
                            src="/"
                            sx={{width: 96, height: 96, marginBottom: '20px'}}/>
                </Badge>
                <EditableSpan
                    value={userName}
                    onChangeTitle={changeUserName}
                />
                <div className={style.profileInfo}>{email}</div>
                <div className={style.profileInfo}>Number of public packs: {publicCardPacksCount}</div>
                <Button variant="outlined" startIcon={<LogoutIcon/>} onClick={() => dispatch(logoutTC())}>
                    Log out
                </Button>
            </div>
        </div>
    );
};