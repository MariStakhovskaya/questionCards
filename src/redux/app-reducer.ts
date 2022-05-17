
import { Dispatch } from "redux";
import {authAPI} from "../api/cards-api";
import {isLoggedInAC} from "../features/Login/login-reducer";
import {setUserDataAC} from "../features/Profile/profile-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType
}
type InitialStateType = typeof initialState

type ActionType = SetStatusACType | SetIsInitializedACType

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}
// actions


export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)



// thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.authMe().then(res => {
        debugger
        if (res.status === 200) {
            // @ts-ignore
            dispatch(setUserDataAC(res.data))
            dispatch(isLoggedInAC(true))
        } else {

        }
    })
        .finally(() => {
            dispatch(setIsInitializedAC(true));
        })
}



//type
export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>
export type SetStatusACType = ReturnType<typeof setStatusAC>




