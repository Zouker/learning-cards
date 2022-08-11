import React, {FC, memo, useState} from 'react';
import {CommonModal} from "../CommonModal";
import {FormControl, InputLabel, NativeSelect, TextField} from "@mui/material";
import {useAppDispatch} from "../../../bll/store";
import {updateCardTC} from "../../../bll/reducers/cards-reducer";


type UpdateCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    cardsPack_id: string
    _id: string
    question?: string
    answer?: string
}

export const UpdateCardModal: FC<UpdateCardModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen,
                                                                       cardsPack_id,
                                                                       _id,
                                                                       question,
                                                                       answer
                                                                   }) => {
    const [newCardQuestion, setNewCardQuestion] = useState(answer);
    const [newCardAnswer, setNewCardAnswer] = useState(question);

    const dispatch = useAppDispatch();



    const updateCard = () => {
        if (cardsPack_id) {
            dispatch(updateCardTC(cardsPack_id, _id, newCardQuestion, newCardAnswer))
        }
        setIsModalOpen(false);
    }

    return (
        <CommonModal
            modalTitle={'Edit Card'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={updateCard}
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