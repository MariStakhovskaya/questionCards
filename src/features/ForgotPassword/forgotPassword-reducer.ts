import {Dispatch} from "redux";
import {authAPI} from "../../api/cards-api";
import {isError} from "../Login/login-reducer";
import {setStatusAC} from "../../redux/app-reducer";

const initialState = {
    email:'',
    isSendInstruction: false
}
type InitialStateType = typeof initialState

export const forgotPasswordReducer = (state: InitialStateType = initialState, action: ForgotPasswordType | IsSendInstructionACType): InitialStateType => {
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

export const forgotPasswordTC = (email: string) => ( dispatch: Dispatch) => {
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
export type ForgotPasswordType = ReturnType<typeof forgotPasswordAC>
export type IsSendInstructionACType = ReturnType<typeof isSendInstructionAC>