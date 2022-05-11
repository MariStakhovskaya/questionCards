import {Dispatch} from "redux";
import {authAPI} from "../api/cards-api";

const initialState = {
    name: '',
    avatar:''
}
type InitialStateType = typeof initialState
type ActionTypes = UpdateUserDateType | UpdateUserAvatarType

export const profileReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'UPDATE-USER-NAME':
            return {...state, name: action.name}
        case 'UPDATE-USER-AVATAR':
            return {...state, avatar: action.avatar}
        default:
            return state
    }
}
// actions

export const updateUserDateAC = (name: string) => ({
    type: 'UPDATE-USER-NAME', name} as const)

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
            dispatch(updateUserDateAC(res.data.avatar))
        })
}



//type

export type UpdateUserDateType = ReturnType<typeof updateUserDateAC>
export type UpdateUserAvatarType = ReturnType<typeof updateUserAvatarAC>