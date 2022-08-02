import {CardPacksType, packsAPI, RequestAddPacksType} from '../../feautures/packs/packsAPI';
import {AppThunk} from '../store';
import {AxiosError} from 'axios';
import {errorUtils} from '../../utils/error-utils';
import {setAppStatusAC} from './app-reducer';

const initialState = {
    cardPacks: [] as CardPacksType[],
    params: {
        packName: '',
        min: 0,
        max: 0,
        sortPacks: '',
        page: 0,
        pageCount: 10,
        user_id: ''
    },
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 110,
    token: '',
    tokenDeathTime: 0,
    modal: false
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'packs/GET-PACKS':
            return {...state, cardPacks: action.packs}
        case 'packs/ADD-PACKS':
        //return {cardPacks: action.newCardPack, ...state}
        case 'packs/OPEN-MODAL':
            //return {...state, modal:action.}

        default:
            return state
    }
}

// thunks
export const getPacksTC = (): AppThunk => (dispatch, getState) => {
    const {params} = getState().packs
    dispatch(setAppStatusAC('loading'))
    packsAPI.getPacks(params)
        .then((res) => {
            dispatch(getPacksAC(res.data.cardPacks))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}
export const addPacksTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.addPacks('Hello')
        .then((res) => {
            dispatch(getPacksTC())
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const deletePacksTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.deletePacks(id)
        .then((res) => {
            dispatch(getPacksTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
            dispatch(setAppStatusAC('failed'))
        })
}
export const updatePacksTC = (id: string, name:string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.updatePacks(id, name)
        .then((res) => {
            dispatch(getPacksTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
            dispatch(setAppStatusAC('failed'))
        })
}

// actions
const getPacksAC = (packs: CardPacksType[]) => ({type: 'packs/GET-PACKS', packs} as const)
const addPacksAC = (newCardPack: RequestAddPacksType) => ({type: 'packs/ADD-PACKS', newCardPack} as const)
const openModalDialogAC = (isOpen: boolean) => ({type: 'packs/OPEN-MODAL', isOpen} as const)

// types
type InitialStateType = typeof initialState

type ActionType = ReturnType<typeof getPacksAC> | ReturnType<typeof addPacksAC> | ReturnType<typeof openModalDialogAC>