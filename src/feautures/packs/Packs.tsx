import React, {ChangeEvent, useEffect, useState} from 'react';
import {PacksTable} from './PacksTable';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {addPackTC, getPacksTC, searchPackNameAC, setMinMaxAC, setMyAllPacksAC} from '../../bll/reducers/packs-reducer';
import {Button, Slider} from '@mui/material';
import styles from './Packs.module.css'
import {useDebounce} from '../../hooks/useDebounce';
import {Search} from '../../components/Search/Search';
import {Navigate} from 'react-router-dom';

export const Packs = () => {
    const dispatch = useAppDispatch()
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)
    const page = useAppSelector(state => state.packs.params.page)
    const pageCount = useAppSelector(state => state.packs.params.pageCount)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const isMyPack = useAppSelector(state => state.packs.isMyPack)
    const sortPacks = useAppSelector(state => state.packs.params.sortPacks)

    const [value, setValue] = React.useState<number[]>([min, max]);
    const [searchValue, setSearchValue] = useState('')

    const debouncedValue = useDebounce(searchValue, 1000)

    const addPack = () => {
        const newPackName = 'HELLO'
        const deckCover = ''
        const isPrivate = false
        dispatch(addPackTC(newPackName, deckCover, isPrivate))
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    }

    const handleChangeCommitted = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
        if (Array.isArray(value)) {
            dispatch(setMinMaxAC(value))
        }
    }

    const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
        dispatch(searchPackNameAC(e.currentTarget.value))
    }

    const myPacksHandler = () => {
        dispatch(setMyAllPacksAC(true))
    }

    const allPacksHandler = () => {
        dispatch(setMyAllPacksAC(false))
    }

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, min, max, page, pageCount, debouncedValue, isMyPack, sortPacks])


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.title}>
                    Packs List
                </div>
                <Button variant={'contained'} onClick={addPack}>Add new pack</Button>
            </div>
            <div className={styles.settings}>
                <div className={styles.search}>
                    <div>Search</div>
                    <Search value={searchValue} onChange={onChangeSearchHandler}/>
                </div>
                <div>
                    <div>
                        Show packs cards
                    </div>
                    <Button className={styles.buttonMyAll} variant={isMyPack ? 'contained' : 'outlined'}
                            onClick={myPacksHandler}>My</Button>
                    <Button className={styles.buttonMyAll} variant={!isMyPack ? 'contained' : 'outlined'}
                            onClick={allPacksHandler}>All</Button>
                </div>
                <div className={styles.sliderContainer}>
                    <div>
                        Number of cards
                    </div>
                    <div className={styles.rangeSlider}>
                        <div className={styles.minMaxValue}>{min}</div>
                        <Slider
                            className={styles.slider}
                            min={minCardsCount}
                            max={maxCardsCount}
                            value={value}
                            onChange={handleChange}
                            onChangeCommitted={handleChangeCommitted}
                            valueLabelDisplay="off"
                            disableSwap
                        />
                        <div className={styles.minMaxValue}>{max}</div>
                    </div>
                </div>
            </div>
            <div className={styles.table}>
                <PacksTable/>
            </div>
        </div>
    );
};