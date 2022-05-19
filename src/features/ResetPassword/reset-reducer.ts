import {Dispatch} from "redux";
import {authAPI} from "../../api/cards-api";
import {AppActionsType} from "../../redux/store";
import {setStatusAC} from "../../app/app-reducer";
import {isError} from "../Login/login-reducer";

const initialState = {
 isSendPassword: false
}
type InitialStateType = typeof initialState


export const resetReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'CREATE-NEW-PASSWORD':
            return {...state, ...action.payload}
        default:
            return state
    }
}
// actions
export const createNewPasswordAC = (isSendPassword: boolean) => ({
    type:  "CREATE-NEW-PASSWORD",
    payload: {isSendPassword} }as const)

// thunk

export const createNewPasswordTC = (password: string, token: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.createNewPassword(password, token)
        .then(res => {
            dispatch(createNewPasswordAC(true))
            dispatch(setStatusAC('succeeded'))
            console.log(res.data)
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

export type NewPasswordActionTypes = CreateNewPasswordType
 export type CreateNewPasswordType = ReturnType<typeof createNewPasswordAC>