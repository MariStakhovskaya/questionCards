import {Dispatch} from "redux";
import {authAPI} from "../../api/cards-api";
import {isError, isLoggedInAC} from "../Login/login-reducer";
import {AppActionsType} from "../../redux/store";
import {setStatusAC} from "../../app/app-reducer";

const initialState = {
    email: '',
    password: '',
    error: ''
}

type InitialStateType = typeof initialState


export const loginReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {

    switch (action.type) {
        case "REGISTRATION":
            return {...state, email: action.email, password: action.password}

        default:
            return state
    }
}
// actions
export const registrationAC = (email: string, password: string) => (
    {type: 'REGISTRATION', email, password} as const)


// thunk

export const registrationTC = (email: string, password: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.registration(email, password)
        .then((res) => {
            console.log(res.data.addedUser)
            dispatch(setStatusAC('succeeded'))
            dispatch(isLoggedInAC(true))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console');
            console.log(error)
            dispatch(isError(error))
            setTimeout(() => {
                dispatch(isError(''))
            }, 3000)
            dispatch(setStatusAC('failed'))
        })
}

//type
export type RegistrationActionsType = RegistrationType
export type RegistrationType = ReturnType<typeof registrationAC>



