import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {addCardTC, getCardsTC, searchQuestionAC, setPackIdAC, setPackNameAC} from '../../bll/reducers/cards-reducer';
import {useNavigate, useParams} from 'react-router-dom';
import {CardsTable} from './CardsTable';
import {Button, TextField} from '@mui/material';
import styles from './Cards.module.css'
import {useDebounce} from '../../hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';

export const Cards = () => {
    const dispatch = useAppDispatch()
    const {cardsPack} = useParams()
    const page = useAppSelector(state => state.cards.params.page)
    const pageCount = useAppSelector(state => state.cards.params.pageCount)
    const packs = useAppSelector(state => state.packs.cardPacks)
    const packName = useAppSelector(state => state.cards.packName)
    const userId = useAppSelector(state => state.profile._id)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const [name, id] = cardsPack?.split('~') as string[]
    const navigate = useNavigate()

    const [value, setValue] = useState('')

    const debouncedValue = useDebounce(value, 1000)

    const addCard = () => {
        const question = 'HARDCODE QUESTION'
        const answer = 'HARDCODE ANSWER'
        if (id) {
            dispatch(addCardTC(id, question, answer))
        }
    }

    const onClickBackHandler = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (id) {
            dispatch(setPackIdAC(id))
            dispatch(setPackNameAC(name))
            dispatch(getCardsTC())
        }
    }, [dispatch, id, name, page, pageCount, packUserId, packs, debouncedValue])

    return (
        <div>
            <div onClick={onClickBackHandler} className={styles.backButton}>
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 5.5H2M2 5.5L6.66667 1M2 5.5L6.66667 10" stroke="black" strokeWidth="2"/>
                </svg>
                <div className={styles.back}>Back to Packs List</div>
            </div>
            <div className={styles.packName}>{packName}</div>
            {userId === packUserId
                ? <div className={styles.addCardButton}>
                    <Button variant={'contained'} onClick={addCard}>Add new card</Button>
                </div>
                : <></>}
            <div className={styles.search}>
                <SearchIcon/>
                <TextField
                    variant="standard"
                    type={'search'}
                    placeholder={'Search...'}
                    value={value}
                    onChange={(e) => {
                        setValue(e.currentTarget.value)
                        dispatch(searchQuestionAC(e.currentTarget.value))
                    }}/>
            </div>
            <CardsTable/>
        </div>
    );
};