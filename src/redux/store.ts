import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./auth-reducer";
import {appReducer} from "./app-reducer";
import {loginReducer} from "./login-reducer";
import {profileReducer} from "./profile-reducer";
import {resetReducer} from "./reset-reducer";
import {forgotPasswordReducer} from "./forgotPassword-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    login:loginReducer,
    profile: profileReducer,
    reset: resetReducer,
    forgot: forgotPasswordReducer
})
// определить автоматически тип всего объекта состояния
export type AppRootState = ReturnType<typeof rootReducer>
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
