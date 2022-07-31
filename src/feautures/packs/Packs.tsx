import React, {useEffect} from 'react';
import {PacksTable} from './PacksTable';
import {useAppDispatch} from '../../bll/store';
import {getPacksTC} from '../../bll/reducers/packs-reducer';

export const Packs = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPacksTC())
    }, [])

    return (
        <div>
            <PacksTable/>
        </div>
    );
};