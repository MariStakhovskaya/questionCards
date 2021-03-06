import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import {appReducer, AppReducerActionType} from "../app/app-reducer";
import {LoginActionsType, loginReducer} from "../features/Login/login-reducer";
import {ProfileActionTypes, profileReducer} from "../features/Profile/profile-reducer";
import {NewPasswordActionTypes, resetReducer} from "../features/ResetPassword/reset-reducer";
import {ForgotPasswordActionsType, forgotPasswordReducer} from "../features/ForgotPassword/forgotPassword-reducer";
import {RegistrationActionsType} from "../features/Registration/regist-reducer";
import {PacksListActionsType, packsReducer} from "../features/Packs/packs-reducer";
import {CardsListActionsType, cardsReducer} from "../features/Cards/cards-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app: appReducer,
    login:loginReducer,
    profile: profileReducer,
    reset: resetReducer,
    forgot: forgotPasswordReducer,
    packs: packsReducer,
    cards: cardsReducer
})
// определить автоматически тип всего объекта состояния
export type AppRootState = ReturnType<typeof rootReducer>
// Типизация экшн для всего апп
export type AppActionsType = LoginActionsType |
    ProfileActionTypes |
    AppReducerActionType |
    ForgotPasswordActionsType |
    RegistrationActionsType |
    NewPasswordActionTypes |
    PacksListActionsType |
    CardsListActionsType

export type TypeDispatch = ThunkDispatch<AppRootState, any, AppActionsType>;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>


// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
