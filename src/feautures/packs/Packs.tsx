import React, {useEffect} from 'react';
import {PacksTable} from './PacksTable';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {getPacksTC} from '../../bll/reducers/packs-reducer';
import FormDialogs from '../../utils/FormDialogs';

export const Packs = () => {
    const dispatch = useAppDispatch()
    const modal = useAppSelector(state => state.packs.modal)
    useEffect(() => {
        dispatch(getPacksTC())
    }, [])

    return (
        <div>
            <PacksTable/>
            {modal && <FormDialogs/>}
        </div>
    );
};