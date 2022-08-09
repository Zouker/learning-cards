import React, {FC, memo, useState} from 'react';
import {CommonModal} from "../CommonModal";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";

type CreatePackModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}

export const CreatePackModal: FC<CreatePackModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen
                                                                   }) => {
    const[packName, setPackName] = useState<string>('');
    const[isPrivate, setIsPrivate] = useState<boolean>(false)

    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    const addCardPack = () => {
        // dispatch(addPackTC(packName, isPrivate));
        // setPackName('')
        // setIsModalOpen(false)
        //navigate('/packs')
    }

    return (
        <CommonModal
            modalTitle={'Add New Pack'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={addCardPack}
            buttonTitle={'Save'}
        >
                <TextField id="standard-basic"
                           label="Enter Pack Title"
                           variant="standard"
                           value={packName}
                           onChange={(e) => setPackName(e.currentTarget.value)}
                />

                <FormControlLabel control={<Checkbox
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.currentTarget.checked)}
                />} label="Private pack" />
        </CommonModal>
    );
})