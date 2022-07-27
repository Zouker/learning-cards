import React, {ChangeEvent, useState} from 'react';
import style from './Profile.module.css'
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SaveIcon from '@mui/icons-material/Save';
import {Button} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

// const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
// const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
// const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
//
// const dispatch = useDispatch()
//
// useEffect(() => {
//     if (demo || !isLoggedIn) {
//         return;
//     }
//     const thunk = fetchTodolistsTC()
//     dispatch(thunk)
// }, [])
//
// const changeTodolistTitle = useCallback(function (id: string, title: string) {
//     const thunk = changeTodolistTitleTC(id, title)
//     dispatch(thunk)
// }, [])


export const Profile = () => {

    let [editMode, setEditMode] = useState(false);
    let [nickname, setNickname] = useState('nickname');

    const activateEditMode = () => {
        setEditMode(true);
        setNickname(nickname);
    }
    const activateViewMode = () => {
        setEditMode(false);
        // props.onChange(title);
    }
    const changeNickName = (e: ChangeEvent<HTMLInputElement>) => {
        setNickname(e.currentTarget.value)
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
                {editMode ? <Box sx={{ '& > :not(style)': { m: 1 } }} onBlur={activateViewMode} onChange={changeNickName}>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="nickname">
                            Nickname
                        </InputLabel>
                        <Input
                            id="input-with-icon-nickname"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SaveIcon color={"primary"} onClick={activateViewMode}/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box> : <div className={style.editableSpan}><span onDoubleClick={activateEditMode}><EditIcon color={"primary"} onClick={activateEditMode}/>{nickname}</span></div>}
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