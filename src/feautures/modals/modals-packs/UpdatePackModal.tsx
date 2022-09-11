import React, {FC, memo, useEffect, useState} from 'react';
import {CommonModal} from '../CommonModal';
import {Checkbox, FormControlLabel, IconButton, TextField} from '@mui/material';
import {CardPacksType} from '../../../api/packsAPI';
import {useAppDispatch} from '../../../redux/store';
import {updatePackTC} from '../../../redux/reducers/packs-reducer';
import styles from './PackModal.module.css';
import noImage from '../../../assets/img/no-image.svg';
import {InputTypeFile} from '../../../components/InputTypeFile/InputTypeFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {setAppErrorAC} from '../../../redux/reducers/app-reducer';

type UpdatePackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    cardsPack: CardPacksType | null
}

export const UpdatePackModal: FC<UpdatePackModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen,
                                                                       cardsPack
                                                                   }) => {
    const [newPackName, setNewPackName] = useState<string>(cardsPack ? cardsPack.name : '');
    const [deckCover, setDeckCover] = useState(cardsPack ? cardsPack.deckCover : noImage)
    const [isImageBroken, setIsImageBroken] = useState(false)
    const [isPrivate, setIsPrivate] = useState<boolean>(false)

    const dispatch = useAppDispatch();

    useEffect(() => {
        cardsPack && setNewPackName(cardsPack.name)
        cardsPack && setDeckCover(cardsPack.deckCover)
    }, [cardsPack])

    const updateCardPack = () => {
        cardsPack && dispatch(updatePackTC(cardsPack._id, newPackName, deckCover, isPrivate));
        setNewPackName(newPackName)
        setIsModalOpen(false)
    }

    const errorHandler = () => {
        setIsImageBroken(true)
        dispatch(setAppErrorAC('Wrong image'))
    }

    return (
        <CommonModal
            modalTitle={'Update Pack'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={updateCardPack}
            buttonTitle={'Save'}
            color={'primary'}
        >
            <TextField id="standard-basic"
                       fullWidth
                       label="Enter New Pack Title"
                       variant="standard"
                       value={newPackName}
                       onChange={(e) => setNewPackName(e.currentTarget.value)}
            />
            <div>
                <FormControlLabel control={<Checkbox
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.currentTarget.checked)}
                />} label="Private pack"/>
            </div>
            Pack cover preview
            <div className={styles.frame}>
                {cardsPack?.deckCover
                    ? <img
                        src={isImageBroken ? deckCover : deckCover}
                        className={styles.image}
                        onError={errorHandler}
                        alt="img"
                    />
                    : <img
                        src={deckCover ? deckCover : noImage}
                        className={styles.image}
                        onError={errorHandler}
                        alt="img"
                    />
                }
            </div>
            <InputTypeFile uploadImage={(image: string) => setDeckCover(image)}>
                <div className={styles.uploadButton}>
                    <IconButton component="span">
                        <CloudUploadIcon color={'primary'}/>
                    </IconButton>
                </div>
            </InputTypeFile>
            <div><p>Do you really want to change <b>{cardsPack!.name}</b>?</p></div>
            {/*! is Non-null Assertion Operator (Postfix !)*/}
        </CommonModal>
    );
})