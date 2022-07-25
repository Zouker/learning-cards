const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-ERROR':
            return {...state, error: action.error}
        case 'SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

// actions
export const setAppErrorAC = (error: null | string) => ({type: 'SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET-STATUS', status} as const)

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type ActionsType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>