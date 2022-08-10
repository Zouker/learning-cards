import React, {FC, memo, useState} from 'react';
import {CommonModal} from "../CommonModal";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
// import {useParams} from "react-router-dom";

type CreateCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}

export const CreateCardModal: FC<CreateCardModalPropsType> = memo(({
                                                                       isModalOpen,
                                                                       setIsModalOpen
                                                                   }) => {
    const [cardQuestion, setCardQuestion] = useState<string>('');
    const [cardAnswer, setCardAnswer] = useState<string>('');

    // const dispatch = useAppDispatch();
    // const {cardsPack_id} = useParams<'cardsPack_id'>();


    const addCard = () => {
        // if (cardsPack_id) {
        //     dispatch(addCardTC({cardsPack_id: cardsPack_id, cardQuestion: cardQuestion, cardAnswer: cardAnswer}))
        //     setCardQuestion('')
        //     setCardAnswer('')
        // }
    }

    return (
        <CommonModal
            modalTitle={'Add New Card'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={addCard}
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
                           label="Enter Question"
                           variant="standard"
                           value={cardQuestion}
                           onChange={(e) => setCardQuestion(e.currentTarget.value)}
                />
                <TextField id="standard-basic"
                           label="Enter Answer"
                           variant="standard"
                           value={cardAnswer}
                           onChange={(e) => setCardAnswer(e.currentTarget.value)}
                />
            </div>
        </CommonModal>
    );
})