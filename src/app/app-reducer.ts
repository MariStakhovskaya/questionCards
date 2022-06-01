import {authAPI} from "../api/cards-api";
import { isLoggedInAC} from "../features/Login/login-reducer";
import {setUserDataAC} from "../features/Profile/profile-reducer";
import {AppActionsType, AppThunkType} from "../redux/store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    isInitialized: false,
    status: 'idle' as RequestStatusType,
    error: ''
}
type InitialStateType = typeof initialState


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}
// actions
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)
export const setIsErrorAppAC = (error: string) => ({type: 'APP/ERROR', error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)



// thunk
export const initializeAppTC = (): AppThunkType => (dispatch) => {

    authAPI.authMe().then(res => {

            dispatch(setUserDataAC(res.data))
        dispatch(isLoggedInAC(true))
    })
        .catch(err => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console');
            dispatch(setIsErrorAppAC(error))
            setTimeout(() => {
                dispatch(setIsErrorAppAC(''))
            }, 5000)
            dispatch(setStatusAC('failed'))

        })
        .finally(() => {
            dispatch(setIsInitializedAC(true));
        })
}

/*
export const initializeAppTC = (): AppThunkType => async (dispatch) => {
    try{
        const res = await authAPI.authMe()
        if (res.status === 200) {
            dispatch(setUserDataAC(res.data.data))
            dispatch(isLoggedInAC(true))

        }
    }

   catch (e) {

   }
   finally {
        dispatch(setIsInitializedAC(true));
    }
    }
*/



//type
export type AppReducerActionType = SetStatusACType | SetIsInitializedACType | SetIsErrorAppACType

export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>
export type SetIsErrorAppACType = ReturnType<typeof setIsErrorAppAC>
export type SetStatusACType = ReturnType<typeof setStatusAC>




