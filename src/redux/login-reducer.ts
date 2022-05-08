import { Dispatch} from "redux";
import {authAPI, LoginParamsType, LoginResponseType} from "../api/cards-api";

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
            debugger
            return {...state, isLoggedIn:action.isLoggedIn}
        case "login/SET_USER":
            debugger
            return {...state, email: action.payload.userData.email,name: action.payload.userData.name, avatar: action.payload.userData.avatar }
        case "login/SET_ERROR":
            debugger
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


export type isLoggedInAC = ReturnType<typeof isLoggedInAC>
export type isError = ReturnType<typeof isError>
export type setUserDataAC = ReturnType<typeof setUserDataAC>

// thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<isLoggedInAC |setUserDataAC | isError >) => {
        debugger
        authAPI.login(data)
            .then((res) => {
                debugger
                console.log(res.data)

                dispatch(setUserDataAC(res.data))
                dispatch(isLoggedInAC(true))
            })
            .catch(err => {
                debugger
                    const error = err.response
                        ? err.response.data.error
                        : (err.message + ', more details in the console');
                    console.log(error)
                dispatch(isError(error))

            })

}



//type
