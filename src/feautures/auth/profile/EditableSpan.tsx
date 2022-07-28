import React, {ChangeEvent, useState} from 'react';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SaveIcon from "@mui/icons-material/Save";
import style from "./Profile.module.css";
import EditIcon from "@mui/icons-material/Edit";
import {useAppSelector} from "../../../bll/store";

type EditableSpanPropsType = {
    title: string
    editMode: boolean
    changeTitle: (title: string) => void
    setEditMode: (editMode: boolean) => void
}


export const EditableSpan = ({
                                 title,
                                 changeTitle,
                                 editMode,
                                 setEditMode,
                             }: EditableSpanPropsType) => {
    const userName = useAppSelector(state => state.profile.name)
    const [localName, setLocalName] = useState<string>(userName)

    const activateViewMode = () => {
        changeTitle(localName)
        setEditMode(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalName(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return editMode
        ? <Box sx={{'& > :not(style)': {m: 1}}}
               onBlur={activateViewMode}
               onChange={onChangeHandler}
               onKeyDown={onKeyPressHandler}
        >
            <FormControl variant="standard">
                <InputLabel htmlFor="nickname">
                    Nickname
                </InputLabel>
                <Input
                    id="input-with-icon-nickname"
                    autoFocus
                    startAdornment={
                        <InputAdornment position="start">
                            <SaveIcon color={"primary"} onClick={activateViewMode}/>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box> : <div className={style.editableSpan}><span onDoubleClick={() => setEditMode(true)}><EditIcon color={"primary"}
                                                                                                      onClick={() => setEditMode(true)}/>{title}</span>
        </div>
}

