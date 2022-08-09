import {CardPacksType, packsAPI} from '../../feautures/packs/packsAPI';
import {AppThunk} from '../store';
import {AxiosError} from 'axios';
import {errorUtils} from '../../utils/error-utils';
import {setAppStatusAC} from './app-reducer';

const initialState = {
    cardPacks: [] as CardPacksType[],
    params: {
        packName: '',
        min: 0,
        max: 110,
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
    isMyPack: false
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'packs/GET-PACKS':
            return {...state, cardPacks: action.packs}
        case 'packs/SET-PACK-PAGE':
            return {...state, params: {...state.params, page: action.page}}
        case 'packs/SET-PACK-PAGE-COUNT':
            return {...state, params: {...state.params, pageCount: action.pageCount}}
        case 'packs/SET-PACKS-TOTAL-COUNT':
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case 'packs/SEARCH-PACK-NAME':
            return {...state, params: {...state.params, packName: action.packName}}
        case 'packs/SET-MIN-MAX':
            return {...state, params: {...state.params, min: action.value[0], max: action.value[1]}}
        case 'packs/SORT-PACKS':
            return {...state, params: {...state.params, sortPacks: action.sortPacks}}
        case 'packs/SET-MY-ALL-PACK':
            return {...state, isMyPack: action.isMyPack}
        default:
            return state
    }
}

// thunks
export const getPacksTC = (): AppThunk => (dispatch, getState) => {
    const {isMyPack, params} = getState().packs
    const userId = getState().profile._id
    dispatch(setAppStatusAC('loading'))
    packsAPI.getPacks({
        ...params,
        user_id: isMyPack ? userId : '',
    })
        .then((res) => {
            dispatch(getPacksAC(res.data.cardPacks))
            dispatch(setPackPageAC(res.data.page))
            dispatch(setPackPageCountAC(res.data.pageCount))
            dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}
export const addPackTC = (packName: string, deckCover: string, isPrivate: boolean): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.addPack(packName, deckCover, isPrivate)
        .then((res) => {
            dispatch(getPacksTC())
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}
export const deletePackTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.deletePack(id)
        .then((res) => {
            dispatch(getPacksTC())
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

export const updatePackTC = (_id: string, name: string, deckCover: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.updatePack(_id, name, deckCover)
        .then((res) => {
            dispatch(getPacksTC())
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

export const sortPacksTC = (sortParams: string): AppThunk => (dispatch) => {
    dispatch(sortPacksAC(sortParams))
    dispatch(getPacksTC())
}

// actions
const getPacksAC = (packs: CardPacksType[]) => ({type: 'packs/GET-PACKS', packs} as const)
export const setPackPageAC = (page: number) => ({type: 'packs/SET-PACK-PAGE', page} as const)
export const setPackPageCountAC = (pageCount: number) => ({type: 'packs/SET-PACK-PAGE-COUNT', pageCount} as const)
export const setPacksTotalCountAC = (cardPacksTotalCount: number) => ({
    type: 'packs/SET-PACKS-TOTAL-COUNT',
    cardPacksTotalCount
} as const)
export const searchPackNameAC = (packName: string) => ({type: 'packs/SEARCH-PACK-NAME', packName} as const)
export const sortPacksAC = (sortPacks: string) => ({type: 'packs/SORT-PACKS', sortPacks} as const)
export const setMinMaxAC = (value: Array<number>) => ({type: 'packs/SET-MIN-MAX', value} as const)
export const setMyAllPacksAC = (isMyPack: boolean) => ({type: 'packs/SET-MY-ALL-PACK', isMyPack} as const)

// types
type InitialStateType = typeof initialState

type ActionType =
    ReturnType<typeof getPacksAC>
    | ReturnType<typeof setPackPageAC>
    | ReturnType<typeof setPackPageCountAC>
    | ReturnType<typeof setPacksTotalCountAC>
    | ReturnType<typeof searchPackNameAC>
    | ReturnType<typeof setMinMaxAC>
    | ReturnType<typeof sortPacksAC>
    | ReturnType<typeof setMyAllPacksAC>