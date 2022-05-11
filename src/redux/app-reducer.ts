import exp from "constants";
import { Dispatch } from "redux";
import {authAPI} from "../api/cards-api";
import {isLoggedInAC} from "./login-reducer";

const initialState = {
    isInitialized: false,
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: SetIsInitializedACType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}
// actions


export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)



// thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.authMe().then(res => {
        debugger
        console.log(res.data)
        if (res.data.data) {
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