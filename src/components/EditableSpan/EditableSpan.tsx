import React, {ChangeEvent, useState} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SaveIcon from '@mui/icons-material/Save';
import style from '../../feautures/auth/profile/Profile.module.css';
import EditIcon from '@mui/icons-material/Edit';

type EditableSpanPropsType = {
    value: string
    onChangeTitle: (newValue: string) => void
}

export const EditableSpan = ({
                                 value,
                                 onChangeTitle,
                             }: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState(value)

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }

    const activateViewMode = () => {
        setEditMode(false);
        onChangeTitle(title);
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return editMode
        ? <Box sx={{'& > :not(style)': {m: 1}}}
               onBlur={activateViewMode}
               onKeyDown={(e) => {
                   if (e.key === 'Enter') {
                       activateViewMode()
                   }
               }}>
            <FormControl variant="standard">
                <InputLabel htmlFor="nickname">
                    Nickname
                </InputLabel>
                <Input
                    value={title}
                    onChange={changeTitle}
                    autoFocus
                    startAdornment={
                        <InputAdornment position="start"
                                        onClick={activateViewMode}>
                            <SaveIcon color={'primary'} sx={{cursor: 'pointer'}}/>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box> : <div className={style.editableSpan}>
            <span onDoubleClick={activateEditMode}>
                <EditIcon color={'primary'} onClick={activateEditMode}
                          sx={{cursor: 'pointer'}}/>{value}
            </span>
        </div>
}

