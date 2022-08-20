import React, {FC, memo} from 'react';
import {CommonModal} from '../CommonModal';
import {deleteCardTC} from '../../../bll/reducers/cards-reducer';
import {useAppDispatch} from '../../../bll/store';

type DeleteCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    cardName?: string
    _id: string
    cardsPack_id: string
    question: string
}

export const DeleteCardModal: FC<DeleteCardModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen,
                                                                       _id,
                                                                       cardsPack_id,
                                                                       question
                                                                   }) => {

    const dispatch = useAppDispatch();

    const deleteCard = () => {
        dispatch(deleteCardTC(cardsPack_id, _id));
        setIsModalOpen(false)
    }

    return (
        <CommonModal
            modalTitle={'Delete Card'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={deleteCard}
            buttonTitle={'Delete'}
            color={'error'}
        >
            <div>
                <p>Do you really want to remove card with question?</p>
                {question.slice(0, 10) === 'data:image'
                    ? <img src={question} alt={'question img'} style={{width: '100px'}}/>
                    : <b>{question}</b>}
                <p>This card will be deleted.</p>
            </div>
        </CommonModal>
    );
})

