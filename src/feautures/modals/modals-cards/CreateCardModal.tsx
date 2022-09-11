import React, {ChangeEvent, FC, memo, useState} from 'react';
import {CommonModal} from '../CommonModal';
import {
    FormControl,
    IconButton,
    InputLabel,
    NativeSelect,
    TextField
} from '@mui/material';
import {useAppDispatch} from '../../../redux/store';
import {useParams} from 'react-router-dom';
import {addCardTC} from '../../../redux/reducers/cards-reducer';
import noImage from '../../../assets/img/no-image.svg';
import styles from './CardModal.module.css';
import {InputTypeFile} from '../../../components/InputTypeFile/InputTypeFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {setAppErrorAC} from '../../../redux/reducers/app-reducer';

type AddNewCardType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}

export const CreateCardModal: FC<AddNewCardType> = memo(({
                                                             isModalOpen,
                                                             setIsModalOpen
                                                         }) => {
    const [newCardQuestion, setNewCardQuestion] = useState('')
    const [newCardAnswer, setNewCardAnswer] = useState('')
    const [isImageBroken, setIsImageBroken] = useState(false)
    const [questionFormat, setQuestionFormat] = useState<'text' | 'image'>('text')
    const [questionImg, setQuestionImg] = useState(noImage)
    const dispatch = useAppDispatch()
    const {packId} = useParams();

    const addNewCard = () => {
        if (packId && (questionFormat === 'text')) {
            dispatch(addCardTC(packId, newCardQuestion, newCardAnswer));
        }
        if (packId && (questionFormat === 'image')) {
            dispatch(addCardTC(packId, questionImg, newCardAnswer));
        }
        setNewCardQuestion('');
        setNewCardAnswer('');
        setQuestionImg(noImage)
        setIsModalOpen(false);
    }

    const errorHandler = () => {
        setIsImageBroken(true)
        dispatch(setAppErrorAC('Wrong image'))
    }

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setQuestionFormat(event.target.value as 'text' | 'image');
    };

    return (
        <CommonModal
            modalTitle={'Add New Card'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={addNewCard}
            buttonTitle={'Save'}
            handleCloseOperation={() => setQuestionImg(noImage)}
            color={'primary'}
        >
            <div>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Choose question format
                    </InputLabel>
                    <NativeSelect
                        defaultValue={questionFormat}
                        onChange={handleChange}
                    >
                        <option value={'text'}>Text</option>
                        <option value={'image'}>Image</option>
                    </NativeSelect>
                </FormControl>
            </div>
            <div>
                {(questionFormat === 'text') &&
                    <TextField id="standard-basic"
                               fullWidth
                               label="Enter Question"
                               variant="standard"
                               value={newCardQuestion}
                               onChange={(e) => setNewCardQuestion(e.currentTarget.value)}
                    />}
                {(questionFormat === 'image') &&
                    <>
                        <div className={styles.previewTitle}>
                            Question image preview
                        </div>
                        <div className={styles.frame}>
                            <img
                                src={isImageBroken ? noImage : questionImg}
                                className={styles.image}
                                onError={errorHandler}
                                alt="img"
                            />
                        </div>
                        <InputTypeFile
                            uploadImage={(image: string) => setQuestionImg(image)}>
                            <div className={styles.uploadButton}>
                                <IconButton component="span">
                                    <CloudUploadIcon color={'primary'}/>
                                </IconButton>
                            </div>
                        </InputTypeFile>
                    </>}
            </div>
            <div>
                <TextField id="standard-basic"
                           fullWidth
                           label="Enter Answer"
                           variant="standard"
                           value={newCardAnswer}
                           onChange={(e) => setNewCardAnswer(e.currentTarget.value)}
                />
            </div>
        </CommonModal>
    );
})