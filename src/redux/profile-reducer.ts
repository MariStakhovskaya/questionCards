import {Dispatch} from "redux";
import {authAPI, LoginResponseType} from "../api/cards-api";

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
type ActionTypes = UpdateUserDateType | UpdateUserAvatarType | SetUserDataType

export const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    debugger
    switch (action.type) {
        case "login/SET_USER":
            return {...state,
        userData: action.payload
            }
       /* case 'UPDATE-USER-NAME':
            return {...state.userData, name: action.payload }
        case 'UPDATE-USER-AVATAR':
            return {...state, avatar: action.avatar}*/
        default:
            return state
    }
}
// actions

export const setUserDataAC = (userData: LoginResponseType) => ({
    type: 'login/SET_USER',
    payload: {...userData}
} as const)

export const updateUserDateAC = (name: string) => ({
    type: 'UPDATE-USER-NAME',
    payload: {name}} as const)

export const updateUserAvatarAC = (avatar: string) => ({
    type: 'UPDATE-USER-AVATAR', avatar} as const)


// thunk

export const updateUserDateTC = (name: string) => (dispatch: Dispatch<ActionTypes>) => {
    debugger
    authAPI.updateUserData(name)
        .then((res)=>{
            debugger
            console.log(res.data)
            dispatch(updateUserDateAC(res.data.name))
        })
}

export const updateUserAvatarTC = (avatar: string) => (dispatch: Dispatch<ActionTypes>) => {

    authAPI.updateUserAvatar(avatar)
        .then((res)=>{
            console.log(res.data)
            dispatch(updateUserAvatarAC(res.data.avatar))
        })
}



//type

export type UpdateUserDateType = ReturnType<typeof updateUserDateAC>
export type UpdateUserAvatarType = ReturnType<typeof updateUserAvatarAC>
export type SetUserDataType = ReturnType<typeof setUserDataAC>