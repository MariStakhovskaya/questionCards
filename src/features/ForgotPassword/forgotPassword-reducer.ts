import {Dispatch} from "redux";
import {authAPI} from "../../api/cards-api";
import {isError} from "../Login/login-reducer";
import {setStatusAC} from "../../app/app-reducer";
import {AppActionsType} from "../../redux/store";

const initialState = {
    email:'',
    isSendInstruction: false
}
type InitialStateType = typeof initialState

export const forgotPasswordReducer = (state: InitialStateType = initialState, action:AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'FORGOT-PASSWORD':
            return {...state, ... action.payload}
        case 'IS-SEND-INSTRUCTION':
            return {...state, ...action.payload}
        default:
            return state
    }
}
// actions

export const forgotPasswordAC = (email: string) => ({
    type: 'FORGOT-PASSWORD',
    payload: {email} } as const)

export const isSendInstructionAC = (isSendInstruction: boolean) => ({
    type: 'IS-SEND-INSTRUCTION',
    payload: {isSendInstruction} } as const)

// thunk

export const forgotPasswordTC = (email: string) => ( dispatch: Dispatch<AppActionsType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.forgotPassword(email)
        .then(res => {
            dispatch(isSendInstructionAC(true))
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
export type ForgotPasswordActionsType = ForgotPasswordType | IsSendInstructionType

export type ForgotPasswordType = ReturnType<typeof forgotPasswordAC>
export type IsSendInstructionType = ReturnType<typeof isSendInstructionAC>