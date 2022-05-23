
import {CardPacksType, cardsApi} from "../../api/cards-api";
import {setStatusAC} from "../../app/app-reducer";
import {AppActionsType, AppThunkType} from "../../redux/store";
import {isError, isLoggedInAC} from "../Login/login-reducer";
import {Dispatch} from "redux";


const initialState = {
    cardPacks: [] as CardPacksType[],
    isLoggedIn: false,

}
type InitialStateType = typeof initialState


export const packsReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {

    switch (action.type) {
        case "packs/SET-PACKS-LIST":
            return {...state,
                cardPacks: action.packs.map(pack => ({...pack}))}
        case "packs/CHANGE-PACKS-LIST-FILTER":
            return {...state,
                cardPacks: state.cardPacks.map(pack => pack.user_id === action.id ? {...pack, filter: action.filter} : pack)}
        case 'packs/IS-LOGGED-IN':
            return {...state, isLoggedIn:action.isLoggedIn}
        default:
            return state
    }
}
// actions
export const isLoggedInPacksAC = (isLoggedIn: boolean) => (
    {type: 'packs/IS-LOGGED-IN', isLoggedIn} as const)


export const setPacksListAC = (packs:CardPacksType[]) => ({
    type:'packs/SET-PACKS-LIST', packs
} as const)

export const changeFilterPacksListAC = (id: string, filter:FilterValuesType) => ({
    type: 'packs/CHANGE-PACKS-LIST-FILTER',
    id, filter} as const)


// thunk
export const getPacksListsTC = ():AppThunkType => {
    return (dispatch: Dispatch<AppActionsType>) => {
        dispatch(setStatusAC('loading'))
        cardsApi.getPacksList()
            .then((res) => {
                console.log(res.data)
                dispatch(setPacksListAC(res.data.cardPacks))
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
                dispatch(setStatusAC('failed'))

            })
    }
}


//type
export type PacksListActionsType = SetPacksListType | ChangeFilterPacksListType | IsLoggedInPacksType

export type SetPacksListType = ReturnType<typeof setPacksListAC>
export type ChangeFilterPacksListType = ReturnType<typeof changeFilterPacksListAC>
export type IsLoggedInPacksType = ReturnType<typeof isLoggedInPacksAC>

export type FilterValuesType = 'all' | 'my';