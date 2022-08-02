import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {addCardTC, getCardsTC} from '../../bll/reducers/cards-reducer';
import {useParams} from 'react-router-dom';
import {CardsTable} from './CardsTable';
import {Button} from '@mui/material';

export const Cards = () => {
    const dispatch = useAppDispatch()
    const {cardsPack_id} = useParams()
    const packName = useAppSelector(state => state.packs.cardPacks.find(pack => pack._id === cardsPack_id)?.name)

    console.log(cardsPack_id)
    const addCard = () => {
        const question = 'HARDCODE QUESTION'
        const answer = 'HARDCODE ANSWER'
        if (cardsPack_id) {
            dispatch(addCardTC(cardsPack_id, question, answer))
        }
    }

    useEffect(() => {
        if (cardsPack_id) {
            dispatch(getCardsTC({cardsPack_id}))
        }
    }, [dispatch, cardsPack_id])

    return (
        <div>
            {packName}
            <Button variant={'contained'} onClick={addCard}>Add new card</Button>
            <CardsTable/>
        </div>
    );
};