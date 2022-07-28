import React, {ChangeEvent, useState} from 'react';
import style from './Profile.module.css'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import {Button} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector} from "../../../bll/store";


export const Profile = () => {
    const userName = useAppSelector(state => state.profile.name)
    const dispatch = useAppDispatch()

    let [editMode, setEditMode] = useState(false);
    let [name, setName] = useState('user');



    const activateEditMode = () => {
        setEditMode(true);
        setName(name);
    }
    const activateViewMode = () => {
        setEditMode(false);
        // onChangeHandler(name);
    }
    const changeNickName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }



    return (
        <div className={style.profileWrapper}>
            <div className={style.profileBackTo}><ArrowBackIcon/><span>{"Back to Packs List"}</span></div>
            <div className={style.profileContainer}>
                <div className={style.profileHeader}><h2>Personal Infornation</h2></div>
                <Badge
                    overlap="circular"
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    badgeContent={
                        <PhotoCameraIcon color={"primary"} onClick={()=>alert("Save New Avatar")}/>
                    }
                >
                    <Avatar alt="User"
                            src="/"
                            sx={{width: 96, height: 96}}/>
                </Badge>

                {/*//     <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />*/}
                {/*//     : <span onDoubleClick={activateEditMode}>{props.value}</span>*/}
                <address className={style.profileEmail}>me@mail.com</address>
                <Button variant="outlined" startIcon={<LogoutIcon/>} onClick={()=>alert("Bye!")}>
                    Log out
                </Button>
            </div>
        </div>
    );
};