import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from './reducers/app-reducer';
import {authReducer} from './reducers/auth-reducer';
import {registerReducer} from './reducers/register-reducer';
import {profileReducer} from './reducers/profile-reducer';
import {forgotPasswordReducer} from './reducers/forgot-password-reducer';
import {recoverPasswordReducer} from './reducers/recover-password-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    register: registerReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    recoverPassword: recoverPasswordReducer

})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store