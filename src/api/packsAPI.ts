import {AxiosResponse} from 'axios';
import {instance} from './instance/instance';

export const packsAPI = {
    getPacks(params: RequestGetPacksType) {
        return instance.get<RequestGetPacksType, AxiosResponse<ResponseCardPacksType>>('/cards/pack', {params});
    },
    addPack(name: string, deckCover?: string, isPrivate?: boolean) {
        return instance.post<AddPackType, AxiosResponse<CardPacksType>>('/cards/pack', {
            cardsPack: {
                name,
                deckCover,
                private: isPrivate
            }
        })
    },
    deletePack(id: string) {
        return instance.delete<'', AxiosResponse<CardPacksType>>('/cards/pack', {params: {id}})
    },
    updatePack(_id: string, name: string, deckCover: string, isPrivate?: boolean) {
        return instance.put<UpdatePackType, AxiosResponse<CardPacksType>>('cards/pack', {
            cardsPack: {
                _id,
                name,
                deckCover,
                private: isPrivate
            }
        })
    }
}

// types
export type RequestGetPacksType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
type AddPackType = {
    name?: string
    deckCover?: string
    private?: boolean
}

export type UpdatePackType = {
    _id: string
    name?: string
    deckCover?: string
    private?: boolean
}

type ResponseCardPacksType = {
    cardPacks: CardPacksType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

export type CardPacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}
