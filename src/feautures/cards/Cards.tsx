import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getCardsTC, searchQuestionAC} from '../../redux/reducers/cards-reducer';
import {useNavigate, useParams} from 'react-router-dom';
import {CardsTable} from './CardsTable';
import {Button, CircularProgress} from '@mui/material';
import styles from './Cards.module.css'
import {useDebounce} from '../../hooks/useDebounce';
import {Search} from '../../components/Search/Search';
import {CreateCardModal} from '../modals/modals-cards/CreateCardModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import noImage from '../../assets/img/no-image.svg';

export const Cards = () => {
    const dispatch = useAppDispatch()
    const {packId, packName} = useParams()
    const page = useAppSelector(state => state.cards.params.page)
    const pageCount = useAppSelector(state => state.cards.params.pageCount)
    const userId = useAppSelector(state => state.profile._id)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const status = useAppSelector(state => state.app.status)
    const packDeckCover = useAppSelector(state => state.cards.packDeckCover)
    const navigate = useNavigate()

    const [value, setValue] = useState('')

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const debouncedValue = useDebounce(value, 1000)

    const addCardModalOpen = () => {
        setIsCreateModalOpen(true);
    }

    const searchQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        dispatch(searchQuestionAC(e.currentTarget.value))
    }

    const onClickBackHandler = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (packId) {
            dispatch(getCardsTC(packId))
        }
    }, [dispatch, packId, packName, page, pageCount, debouncedValue, packDeckCover])

    return (
        <div className={styles.wrapper}>
            <div onClick={onClickBackHandler} className={styles.backButton}>
                <ArrowBackIcon/>
                <div className={styles.back}>Back to Packs List</div>
            </div>
            {userId === packUserId
                ? <div className={styles.header}>
                    <div>{packName}</div>
                    <div>
                        <Button variant={'contained'} onClick={() => addCardModalOpen()}>Add new card</Button>
                    </div>
                </div>
                : <div className={styles.packName}>{packName}</div>}
            <div className={styles.deckCover}><img src={packDeckCover? packDeckCover : noImage} alt={'deck cover img'} className={styles.packDeckCover}/></div>
            <div className={styles.search}>
                <div>Search</div>
                <div className={styles.searchLine}>
                    <Search value={value} onChange={searchQuestionHandler}/>
                </div>
            </div>
            {status === 'loading' && <div className={styles.preloader}><CircularProgress/></div>}
            <div className={styles.table}>
                <CardsTable/>
            </div>
            <CreateCardModal isModalOpen={isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen}/>
        </div>
    );
};