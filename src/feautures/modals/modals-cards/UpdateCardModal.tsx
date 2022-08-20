import React, {FC, memo, useEffect, useState} from 'react';
import {CommonModal} from '../CommonModal';
import {IconButton, TextField} from '@mui/material';
import {useAppDispatch} from '../../../bll/store';
import {updateCardTC} from '../../../bll/reducers/cards-reducer';
import noImage from '../../../assets/img/no-image.svg';
import styles from './CardModal.module.css';
import {InputTypeFile} from '../../../components/InputTypeFile/InputTypeFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {setAppErrorAC} from '../../../bll/reducers/app-reducer';


type UpdateCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    cardsPack_id: string
    _id: string
    question: string
    answer: string
}

export const UpdateCardModal: FC<UpdateCardModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen,
                                                                       cardsPack_id,
                                                                       _id,
                                                                       question,
                                                                       answer
                                                                   }) => {
    let questionFormat: string;
    if (question.slice(0, 10) === 'data:image') {
        questionFormat = 'image'
    } else {
        questionFormat = 'text'
    }

    const [newCardQuestion, setNewCardQuestion] = useState(question);
    const [newCardAnswer, setNewCardAnswer] = useState(answer);
    const [questionImg, setQuestionImg] = useState(question.slice(0, 10) === 'data:image' ? question : noImage)
    const [isImageBroken, setIsImageBroken] = useState(false)

    const dispatch = useAppDispatch();

    const updateCard = () => {
        if (cardsPack_id && (questionFormat === 'text')) {
            dispatch(updateCardTC(cardsPack_id, _id, newCardQuestion, newCardAnswer))
        }
        if (cardsPack_id && (questionFormat === 'image')) {
            dispatch(updateCardTC(cardsPack_id, _id, questionImg, newCardAnswer))
        }
        setIsModalOpen(false);
    }

    const errorHandler = () => {
        setIsImageBroken(true)
        dispatch(setAppErrorAC('Wrong image'))
    }

    useEffect(() => {
        setNewCardQuestion(question)
        setNewCardAnswer(answer)
        setQuestionImg(question.slice(0, 10) === 'data:image' ? question : noImage)
    }, [question, answer, setQuestionImg])

    return (
        <CommonModal
            modalTitle={'Edit Card'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={updateCard}
            buttonTitle={'Save'}
            color={'primary'}
        >
            {(questionFormat === 'text') &&
                <div>
                    <TextField id="standard-basic"
                               fullWidth
                               label="Enter Question"
                               variant="standard"
                               value={newCardQuestion}
                               onChange={(e) => setNewCardQuestion(e.currentTarget.value)}
                    />
                </div>}
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
                    <InputTypeFile uploadImage={(image: string) => setQuestionImg(image)}>
                        <div className={styles.uploadButton}>
                            <IconButton component="span">
                                <CloudUploadIcon color={'primary'}/>
                            </IconButton>
                        </div>
                    </InputTypeFile>
                </>}
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