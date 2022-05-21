
import {CardPacksType, cardsApi} from "../../api/cards-api";
import {setStatusAC} from "../../app/app-reducer";
import {AppActionsType, AppThunkType} from "../../redux/store";
import {isError} from "../Login/login-reducer";
import {Dispatch} from "redux";


const initialState = {
    cardPacks: [] as CardPacksType[]

}
type InitialStateType = typeof initialState


export const packsReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {

    switch (action.type) {
        case "packs/SET-PACKS-LIST":
            return {...state, cardPacks: action.packs}
        default:
            return state
    }
}
// actions

export const setPacksListAC = (packs:any) => ({
    type:'packs/SET-PACKS-LIST', packs
} as const)



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
export type PacksListActionsType = SetPacksListType

export type SetPacksListType = ReturnType<typeof setPacksListAC>

