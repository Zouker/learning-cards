import React, {FC, memo} from 'react';
import {CommonModal} from "../CommonModal";
import {useAppDispatch} from "../../../redux/store";
import {deletePackTC} from "../../../redux/reducers/packs-reducer";

type DeletePackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    packName?: string
    _id: string
}

export const DeletePackModal: FC<DeletePackModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen,
                                                                       packName,
                                                                       _id
                                                                   }) => {

    const dispatch = useAppDispatch();

    const deleteCardPack = () => {
        dispatch(deletePackTC(_id));
        setIsModalOpen(false)
    }

    return (
        <CommonModal
            modalTitle={'Delete Pack'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={deleteCardPack}
            buttonTitle={'Delete'}
            color={'error'}
        >
            <div>
                <p>Do you really want to remove <b>{packName}</b>?</p>
                <p>All cards will be deleted.</p>
            </div>
        </CommonModal>
    );
})

