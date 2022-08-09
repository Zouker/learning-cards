import {AxiosResponse} from 'axios';
import {instance} from '../../instance/instance';

export const cardsAPI = {
    getCards(cardsPack_id: string) {
        return instance.get<RequestGetCardsType, AxiosResponse<ResponseCardsType>>(`/cards/card?cardsPack_id=${cardsPack_id}`);
    },
    addCard(cardsPack_id: string, cardQuestion?: string, cardAnswer?: string) {
        return instance.post('/cards/card', {card: {cardsPack_id, question: cardQuestion, answer: cardAnswer}})
    },
    deleteCard(cardId: string) {
        return instance.delete('/cards/card', {params: {id: cardId}})
    },
    updateCard(_id: string, question?: string, answer?: string) {
        return instance.put('/cards/card', {card: {_id, question, answer}})
    },
    updateCardGrade(card_id: string, grade: number) {
        return instance.put('/cards/grade', {card_id, grade})
    }
}

//types
export type RequestGetCardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type ResponseCardsType = {
    cards: CardsType[]
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}

export type CardsType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
}