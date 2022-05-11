import { Dispatch} from "redux";
import {authAPI, LoginParamsType, LoginResponseType} from "../api/cards-api";
import {setStatusAC, SetStatusACType} from "./app-reducer";

const initialState = {
        isLoggedIn: false,
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0, // количество колод
        error: ''
}
type InitialStateType = typeof initialState
type ActionsType = isLoggedInAC | setUserDataAC | isError

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'login/IS-LOGGED-IN':
            return {...state, isLoggedIn:action.isLoggedIn}
        case "login/SET_USER":
            return {...state,
                email: action.payload.userData.email,
                name: action.payload.userData.name,
                avatar: action.payload.userData.avatar }
        case "login/SET_ERROR":
            return {...state, error: action.error }
        default:
            return state
    }
}
// actions
export const isLoggedInAC = (isLoggedIn: boolean) => (
    {type: 'login/IS-LOGGED-IN', isLoggedIn} as const)

export const isError = (error: string) => (
    {type: 'login/SET_ERROR', error} as const)

export const setUserDataAC = (userData: LoginResponseType) => ({
    type: 'login/SET_USER',
    payload: {userData}
} as const)

//type
export type isLoggedInAC = ReturnType<typeof isLoggedInAC>
export type isError = ReturnType<typeof isError>
export type setUserDataAC = ReturnType<typeof setUserDataAC>

// thunk

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetStatusACType>) => {
        dispatch(setStatusAC('loading'))
        authAPI.login(data)
            .then((res) => {

                dispatch(setUserDataAC(res.data))
                dispatch(isLoggedInAC(true))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(err => {
                    const error = err.response
                        ? err.response.data.error
                        : (err.message + ', more details in the console');
                dispatch(isError(error))

            })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.logout()
        .then((res)=>{
            dispatch(isLoggedInAC(false))
        })
}


