import React, {FC, memo, useState} from 'react';
import {CommonModal} from "../CommonModal";
import {TextField} from "@mui/material";
import {UpdatePackType} from "../../packs/packsAPI";

type UpdatePackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    cardsPack: UpdatePackType | null
}

export const UpdatePackModal: FC<UpdatePackModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen,
                                                                       cardsPack
                                                                   }) => {
    const [newPackName, setNewPackName] = useState(cardsPack ? cardsPack.name : '');

    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     cardsPack && setNewPackName(cardsPack.name)
    // }, [cardsPack])

    const updateCardPack = () => {
        // cardsPack && dispatch(updatePackTC(cardsPack._id, newPackName, pack.deckCover));
        // setNewPackName(newPackName)
        // setIsModalOpen(false)
    }

    return (
        <CommonModal
            modalTitle={'Update Pack'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={updateCardPack}
            buttonTitle={'Save'}
        >
            <TextField id="standard-basic"
                       label="Enter New Pack Title"
                       variant="standard"
                       value={newPackName}
                       onChange={(e) => setNewPackName(e.currentTarget.value)}
            />
            <div><p>Do you really want to change <b>{cardsPack!.name}</b>?</p></div>
            {/*! is Non-null Assertion Operator (Postfix !)*/}
        </CommonModal>
    );
})