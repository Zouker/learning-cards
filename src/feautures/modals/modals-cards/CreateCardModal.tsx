import React, {FC, memo, useState} from 'react';
import {CommonModal} from "../CommonModal";
import {FormControl, InputLabel, NativeSelect, TextField} from "@mui/material";
import {useAppDispatch} from "../../../bll/store";
import {useParams} from "react-router-dom";
import {addCardTC} from "../../../bll/reducers/cards-reducer";

type AddNewCardType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}

export const CreateCardModal: FC<AddNewCardType> = memo(({isModalOpen, setIsModalOpen}) => {
    const [newCardQuestion, setNewCardQuestion] = useState('')
    const [newCardAnswer, setNewCardAnswer] = useState('')
    const dispatch = useAppDispatch()
    const {packId} = useParams();

    const addNewCard = () => {
        if (packId) {
            dispatch(addCardTC(packId, newCardQuestion, newCardAnswer));
            setNewCardQuestion('');
            setNewCardAnswer('');
        }
        setIsModalOpen(false);
    }


    return (
        <CommonModal
            modalTitle={'Add New Card'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={addNewCard}
            buttonTitle={'Save'}
        >
            <div>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Choose card format
                    </InputLabel>
                    <NativeSelect
                        defaultValue={'Text'}
                        inputProps={{
                        }}
                    >
                        <option value={'Text'}>Text</option>
                        <option value={'Image'}>Image</option>
                    </NativeSelect>
                </FormControl>
            </div>
                <div>
                    <TextField id="standard-basic"
                               fullWidth
                               label="Enter Question"
                               variant="standard"
                               value={newCardQuestion}
                               onChange={(e) => setNewCardQuestion(e.currentTarget.value)}
                    />
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