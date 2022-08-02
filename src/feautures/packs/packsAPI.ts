import {AxiosResponse} from 'axios';
import {instance} from '../../instance/instance';

export const packsAPI = {
    getPacks(params: RequestGetPacksType) {
        return instance.get<RequestGetPacksType, AxiosResponse<ResponseCardPacksType>>('/cards/pack', {params});
    },
    addPacks(name:string){
        return instance.post<RequestAddPacksType,AxiosResponse<RespondAddNewCardsPackType>>('/cards/pack',{cardsPack:{name}})
    }
}

//types
//Requests
export type RequestGetPacksType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export type RequestAddPacksType={
        name?: string
        deckCover?: string
        private?: boolean
}

//Responds
export type RespondAddNewCardsPackType= {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
    token: string
    tokenDeathTime: number
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
