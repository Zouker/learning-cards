import {AppThunk} from '../store';
import {AxiosError} from 'axios';
import {errorUtils} from '../../utils/error-utils';
import {setAppStatusAC} from './app-reducer';
import {cardsAPI, CardsType} from '../../api/cardsAPI';

const initialState = {
    cards: [] as CardsType[],
    card: {} as CardsType,
    params: {
        cardAnswer: '',
        cardQuestion: '',
        min: 0,
        max: 0,
        sortCards: '',
        page: 1,
        pageCount: 5,
    },
    packUserId: '',
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 6,
    packDeckCover: '',
    packName: '',
    packPrivate: true,
    token: '',
    tokenDeathTime: 0
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'cards/GET-CARDS':
            return {...state, cards: action.cards}
        case 'cards/SET-PACK-USER-ID':
            return {...state, packUserId: action.packUserId}
        case 'cards/SET-PAGE':
            return {...state, params: {...state.params, page: action.page}}
        case 'cards/SET-PAGE-COUNT':
            return {...state, params: {...state.params, pageCount: action.pageCount}}
        case 'cards/SET-CARDS-TOTAL-COUNT':
            return {...state, cardsTotalCount: action.cardsTotalCount}
        case 'cards/SEARCH-QUESTION':
            return {...state, params: {...state.params, cardQuestion: action.cardQuestion}}
        case 'cards/SET-CARD-GRADE':
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.card_id ? {...card, grade: action.grade} : card)
            }
        case 'cards/SET-PACK-DECK-COVER':
            return {...state, packDeckCover: action.packDeckCover}
        default:
            return state
    }
}

// thunks
export const getCardsTC = (cardsPack_id: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const {params} = getState().cards
    cardsAPI.getCards(cardsPack_id, params)
        .then((res) => {
            dispatch(getCardsAC(res.data.cards))
            dispatch(setPackUserIdAC(res.data.packUserId))
            dispatch(setCardPageAC(res.data.page))
            dispatch(setCardPageCountAC(res.data.pageCount))
            dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
            dispatch(setPackDeckCover(res.data.packDeckCover))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

export const addCardTC = (cardsPack_id: string, cardQuestion?: string, cardAnswer?: string, questionImg?: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.addCard(cardsPack_id, cardQuestion, cardAnswer, questionImg)
        .then((res) => {
            dispatch(getCardsTC(cardsPack_id))
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
            dispatch(getCardsTC(cardsPack_id))
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
            dispatch(getCardsTC(cardsPack_id))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

export const updateCardGradeTC = (card_id: string, grade: number): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.updateCardGrade(card_id, grade)
        .then((res) => {
            dispatch(updateCardGradeAC(res.data._id, res.data.grade))
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
export const setPackUserIdAC = (packUserId: string) => ({type: 'cards/SET-PACK-USER-ID', packUserId} as const)
export const setCardPageAC = (page: number) => ({type: 'cards/SET-PAGE', page} as const)
export const setCardPageCountAC = (pageCount: number) => ({type: 'cards/SET-PAGE-COUNT', pageCount} as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) => ({
    type: 'cards/SET-CARDS-TOTAL-COUNT',
    cardsTotalCount
} as const)
export const searchQuestionAC = (cardQuestion: string) => ({type: 'cards/SEARCH-QUESTION', cardQuestion} as const)
export const updateCardGradeAC = (card_id: string, grade: number) => ({
    type: 'cards/SET-CARD-GRADE',
    card_id,
    grade
} as const)
export const setPackDeckCover = (packDeckCover: string) => ({type: 'cards/SET-PACK-DECK-COVER', packDeckCover} as const)

// types
type InitialStateType = typeof initialState

type ActionType =
    ReturnType<typeof getCardsAC>
    | ReturnType<typeof setPackUserIdAC>
    | ReturnType<typeof setCardPageAC>
    | ReturnType<typeof setCardPageCountAC>
    | ReturnType<typeof setCardsTotalCountAC>
    | ReturnType<typeof searchQuestionAC>
    | ReturnType<typeof updateCardGradeAC>
    | ReturnType<typeof setPackDeckCover>