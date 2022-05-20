import {Dispatch} from "redux";
import {authAPI, LoginResponseType} from "../../api/cards-api";
import {setStatusAC} from "../../app/app-reducer";
import {AppActionsType} from "../../redux/store";
import {isError} from "../Login/login-reducer";

const initialState = {
    userData: {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0, // количество колод
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: ''}
}
type InitialStateType = typeof initialState


export const profileReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    debugger
    switch (action.type) {
        case "login/SET_USER":
            return {...state,
        ... action.payload}
        case "UPDATE-USER-DATA":
            return {...state,
                userData:{...state.userData,
                    ...action.payload}}
        default:
            return state
    }
}
// actions
export const setUserDataAC = (userData: LoginResponseType) => ({
    type: 'login/SET_USER',
    payload: {userData}
} as const)

export const updateUserDateAC = (name: string, avatar: string) => ({
    type: 'UPDATE-USER-DATA',
    payload: {name,avatar}
} as const)


// thunk

export const updateUserDateTC = (name:string, avatar: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.updateUserData(name, avatar)
        .then((res)=>{
            console.log(res.data.updatedUser)
            dispatch(updateUserDateAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
            dispatch(setStatusAC('succeeded'))
        })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console');
            dispatch(isError(error))
            setTimeout(() => {
                dispatch(isError(''))
            }, 3000)
            dispatch(setStatusAC('failed'))})
}


//type
export type ProfileActionTypes = UpdateUserDataType  | SetUserDataType

export type UpdateUserDataType = ReturnType<typeof updateUserDateAC>
export type SetUserDataType = ReturnType<typeof setUserDataAC>