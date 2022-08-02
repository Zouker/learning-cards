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
    tokenDeathTime: 0
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'packs/GET-PACKS':
            return {...state, cardPacks: action.packs}
        case "packs/ADD-PACKS":
            // return {cardPacks: action.newCardPack, ...state}
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
export const addPacksTC = ():AppThunk=>(dispatch)=>{
    dispatch(setAppStatusAC('loading'))
    packsAPI.addPacks('Hello')
        .then((res)=>{
            console.log('AddRequests')
            dispatch(getPacksTC())
            dispatch(setAppStatusAC('succeeded'))
    })
}

// actions
const getPacksAC = (packs: CardPacksType[]) => ({type: 'packs/GET-PACKS', packs} as const)
const addPacksAC = (newCardPack: RequestAddPacksType) => ({type: 'packs/ADD-PACKS',newCardPack} as const)

// types
type InitialStateType = typeof initialState

type ActionType = ReturnType<typeof getPacksAC>| ReturnType<typeof addPacksAC>