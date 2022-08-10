import React, {FC, memo, useState} from 'react';
import {CommonModal} from "../CommonModal";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";


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

    // const dispatch = useAppDispatch();



    const updateCard = () => {
        // if (cardsPack_id) {
        //     dispatch(updateCardTC({_id: _id, question: newCardQuestion, answer: newCardAnswer}, cardsPack_id))
        // }
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
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"Choose a question format"}
                        label="Choose a question format"
                        // onChange={handleChange}
                    >
                        <MenuItem value={'Text'}>Text</MenuItem>
                        <MenuItem value={'Image'}>Image</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="standard-basic"
                           label="Enter New Question"
                           variant="standard"
                           value={newCardQuestion}
                           onChange={(e) => setNewCardQuestion(e.currentTarget.value)}
                />
                <TextField id="standard-basic"
                           label="Enter New Answer"
                           variant="standard"
                           value={newCardAnswer}
                           onChange={(e) => setNewCardAnswer(e.currentTarget.value)}
                />
            </div>
        </CommonModal>
    );
})