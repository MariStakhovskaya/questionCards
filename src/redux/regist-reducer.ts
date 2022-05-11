import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../api/cards-api";
import {isError, isLoggedInAC} from "./login-reducer";

const initialState = {
    email: '',
    password: '',
    error: ''
}

type InitialStateType = typeof initialState
type ActionsType = registrationACType

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case "REGISTRATION":
            debugger
            return {...state, email: action.email, password: action.password}

        default:
            return state
    }
}
// actions
export const registrationAC = (email: string, password: string) => (
    {type: 'REGISTRATION', email, password} as const)


//type
export type registrationACType = ReturnType<typeof registrationAC>


// thunk

export const registrationTC = (email: string, password: string) => (dispatch: Dispatch<registrationACType | isLoggedInAC | isError>) => {
    authAPI.registration(email, password)
        .then((res) => {
            console.log(res.data.addedUser)
            dispatch(isLoggedInAC(true))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console');
            console.log(error)
            dispatch(isError(error))
        })
}



