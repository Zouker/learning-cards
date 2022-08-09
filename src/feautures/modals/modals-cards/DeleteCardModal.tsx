import React, {FC, memo} from 'react';
import {CommonModal} from "../CommonModal";

type DeleteCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    cardName?: string
    _id?: string
}

export const DeleteCardModal: FC<DeleteCardModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen,
                                                                       cardName,
                                                                       _id
                                                                   }) => {

    // const dispatch = useAppDispatch();

    const deleteCard = () => {
        // dispatch(deleteCardTC(_id));
        // setIsModalOpen(false)
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

