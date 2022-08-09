import React, {FC, memo} from 'react';
import {CommonModal} from "../CommonModal";

type DeletePackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    packName?: string
    id?: string
}

export const DeletePackModal: FC<DeletePackModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen,
                                                                       packName,
                                                                       // id
                                                                   }) => {

    // const dispatch = useAppDispatch();

    const deleteCardPack = () => {
        // dispatch(deletePackTC(id));
        // setIsModalOpen(false)
    }

    return (
        <CommonModal
            modalTitle={'Delete Pack'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={deleteCardPack}
            buttonTitle={'Delete'}
        >
            <div>
                <p>Do you Do you really want to remove <b>{packName}</b>?</p>
                <p>All cards will be deleted.</p>
            </div>
        </CommonModal>
    );
})

