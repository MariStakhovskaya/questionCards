import { Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/cards-api";
import {setStatusAC} from "../../app/app-reducer";
import {setUserDataAC} from "../Profile/profile-reducer";
import {AppActionsType} from "../../redux/store";


const initialState = {
        isLoggedIn: false,
         error: ''
}
type InitialStateType = typeof initialState


export const loginReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {

    switch (action.type) {
        case 'login/IS-LOGGED-IN':
            return {...state, isLoggedIn:action.isLoggedIn}
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



// thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AppActionsType>) => {
        dispatch(setStatusAC('loading'))
        authAPI.login(data)
            .then((res) => {
                dispatch(isLoggedInAC(true))
                console.log(res.data)
                dispatch(setUserDataAC(res.data))
                dispatch(setStatusAC('succeeded'))
            })
            .catch(err => {
                    const error = err.response
                        ? err.response.data.error
                        : (err.message + ', more details in the console');
                dispatch(isError(error))
                dispatch(setStatusAC('failed'))

            })
}

export const logoutTC = () => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.logout()
        .then((res)=>{
            dispatch(isLoggedInAC(false))
            dispatch(setStatusAC('succeeded'))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console');
            dispatch(isError(error))
            dispatch(setStatusAC('failed'))

        })
}

//type
export type LoginActionsType = IsLoggedInType  | IsErrorType

export type IsLoggedInType = ReturnType<typeof isLoggedInAC>
export type IsErrorType = ReturnType<typeof isError>
