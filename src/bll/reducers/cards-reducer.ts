import {AppThunk} from '../store';
import {AxiosError} from 'axios';
import {errorUtils} from '../../utils/error-utils';
import {setAppStatusAC} from './app-reducer';
import {cardsAPI, CardsType, RequestGetCardsType} from '../../feautures/cards/cardsAPI';

const initialState = {
    cards: [] as CardsType[],
    card: {} as CardsType,
    params: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 0,
        sortCards: '',
        page: 0,
        pageCount: 10,
    },
    packUserId: '',
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 6,
    token: '',
    tokenDeathTime: 0
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'cards/GET-CARDS':
            return {...state, cards: action.cards}
        default:
            return state
    }
}

// thunks
export const getCardsTC = (params: RequestGetCardsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.getCards(params)
        .then((res) => {
            dispatch(getCardsAC(res.data.cards))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

export const addCardTC = (cardsPack_id: string, cardQuestion?: string, cardAnswer?: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.addCard(cardsPack_id, cardQuestion, cardAnswer)
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id: cardsPack_id}))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

export const deleteCardTC = (cardsPack_id: string, _id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.deleteCard(_id)
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id}))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

export const updateCardTC = (cardsPack_id: string, _id: string, question?: string, answer?: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.updateCard(_id, question, answer)
        .then((res) => {
            dispatch(getCardsTC({cardsPack_id}))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

// actions
const getCardsAC = (cards: CardsType[]) => ({type: 'cards/GET-CARDS', cards} as const)

// types
type InitialStateType = typeof initialState

type ActionType = ReturnType<typeof getCardsAC>