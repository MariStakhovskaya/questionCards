import {Dispatch} from "redux";
import {authAPI} from "../api/cards-api";

const initialState = {
 password:''
}
type InitialStateType = typeof initialState
type ActionTypes = CreateNewPasswordType

export const resetReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'CREATE-NEW-PASSWORD':
            return {...state, ...action.payload}
        default:
            return state
    }
}
// actions

export const createNewPasswordAC = (password: string) => ({
    type:  "CREATE-NEW-PASSWORD",
    payload: {password} }as const)

// thunk

export const createNewPasswordTC = (password: string, token: string) => (dispatch: Dispatch) => {
    authAPI.createNewPassword(password, token)
        .then(res => {
            console.log(res.data)
        })
}

//type
 export type CreateNewPasswordType = ReturnType<typeof createNewPasswordAC>