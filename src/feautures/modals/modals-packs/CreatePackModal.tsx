import React, {FC, memo, useState} from 'react';
import {CommonModal} from '../CommonModal';
import {Checkbox, FormControlLabel, IconButton, TextField} from '@mui/material';
import {useAppDispatch} from '../../../bll/store';
import {useNavigate} from 'react-router-dom';
import {addPackTC} from '../../../bll/reducers/packs-reducer';
import {InputTypeFile} from '../../../components/InputTypeFile/InputTypeFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import noImage from '../../../assets/img/no-image.svg';
import {setAppErrorAC} from '../../../bll/reducers/app-reducer';
import styles from './PackModal.module.css'

type CreatePackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}

export const CreatePackModal: FC<CreatePackModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen,
                                                                   }) => {
    const [packName, setPackName] = useState<string>('');
    const [deckCover, setDeckCover] = useState(noImage)
    const [isPrivate, setIsPrivate] = useState<boolean>(false)
    const [isImageBroken, setIsImageBroken] = useState(false)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const addCardPack = () => {
        dispatch(addPackTC(packName, deckCover, isPrivate));
        setPackName('')
        setDeckCover(noImage)
        setIsModalOpen(false)
        navigate('/packs')
    }

    const errorHandler = () => {
        setIsImageBroken(true)
        dispatch(setAppErrorAC('Wrong image'))
    }

    return (
        <CommonModal
            modalTitle={'Add New Pack'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={addCardPack}
            buttonTitle={'Save'}
            handleCloseOperation={() => setDeckCover(noImage)}
            color={'primary'}
        >
            <div>
                <TextField id="standard-basic"
                           fullWidth
                           label="Enter Pack Title"
                           variant="standard"
                           value={packName}
                           onChange={(e) => setPackName(e.currentTarget.value)}
                />
            </div>
            <div>
                <FormControlLabel control={<Checkbox
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.currentTarget.checked)}
                />} label="Private pack"/>
            </div>
            Pack cover preview
            <div className={styles.frame}>
                <img
                    src={isImageBroken ? noImage : deckCover}
                    className={styles.image}
                    onError={errorHandler}
                    alt="img"
                />
            </div>
            <InputTypeFile uploadImage={(image: string) => setDeckCover(image)}>
                <div className={styles.uploadButton}>
                    <IconButton component="span">
                        <CloudUploadIcon color={'primary'}/>
                    </IconButton>
                </div>
            </InputTypeFile>
        </CommonModal>
    );
})