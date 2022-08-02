import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from './reducers/app-reducer';
import {registerReducer} from './reducers/register-reducer';
import {profileReducer} from './reducers/profile-reducer';
import {forgotPasswordReducer} from './reducers/forgot-password-reducer';
import {recoverPasswordReducer} from './reducers/recover-password-reducer';
import {loginReducer} from '../feautures/auth/login/login-reducer';
import {packsReducer} from './reducers/packs-reducer';
import {cardsReducer} from './reducers/cards-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    register: registerReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    recoverPassword: recoverPasswordReducer,
    login: loginReducer,
    packs: packsReducer,
    cards: cardsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store