import React, {FC, memo} from 'react';
import {CommonModal} from "../CommonModal";
import {deleteCardTC} from "../../../bll/reducers/cards-reducer";
import {useAppDispatch} from "../../../bll/store";

type DeleteCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    cardName?: string
    _id: string
    cardsPack_id: string
}

export const DeleteCardModal: FC<DeleteCardModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen,
                                                                       cardName,
                                                                       _id,
                                                                       cardsPack_id
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
        >
            <div>
                <p>Do you Do you really want to remove <b>{cardName}</b>?</p>
                <p>This card will be deleted.</p>
            </div>
        </CommonModal>
    );
})

