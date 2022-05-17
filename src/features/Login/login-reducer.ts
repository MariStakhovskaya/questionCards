import { Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/cards-api";
import {setStatusAC, SetStatusACType} from "../../redux/app-reducer";
import {setUserDataAC, SetUserDataType} from "../Profile/profile-reducer";


const initialState = {
        isLoggedIn: false,
         error: ''
}
type InitialStateType = typeof initialState
type ActionsType = isLoggedInAC  | isError

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

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


//type
export type isLoggedInAC = ReturnType<typeof isLoggedInAC>
export type isError = ReturnType<typeof isError>


// thunk

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType | SetStatusACType |SetUserDataType>) => {
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

export const logoutTC = () => (dispatch: Dispatch<ActionsType | SetStatusACType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.logout()
        .then((res)=>{
            dispatch(isLoggedInAC(false))
            dispatch(setStatusAC('succeeded'))
        })
}


