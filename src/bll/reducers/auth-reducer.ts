const initialState = {}

type InitialStateType = typeof initialState

export type ActionsType = ReturnType<typeof anyAC>

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export const anyAC = () => ({type: ''} as const)