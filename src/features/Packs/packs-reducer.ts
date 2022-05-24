
import {AddPackParamsType, CardPacksType, cardsApi, PacksParamsType} from "../../api/cards-api";
import {setStatusAC} from "../../app/app-reducer";
import {AppActionsType, AppRootState, AppThunkType} from "../../redux/store";
import {isError} from "../Login/login-reducer";
import {Dispatch} from "redux";


const initialState = {
    cardPacks: [] as CardPacksType[],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 4,
    params: {
        min: 0,
        max: 20,
        page: 1,
        pageCount: 12,
        sortPacks: '0updated',
        packName: '',
        user_id: ''
    } as PacksParamsType,


}
type InitialStateType = typeof initialState


export const packsReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {

    switch (action.type) {
        case "packs/SET-PACKS-LIST":
            return {...state,
                cardPacks: action.packs.map(pack => ({...pack}))
            }
        case "packs/SET-USER-ID":
            return {...state,params: {...state.params, user_id: action.userId}
                }
        case "packs/ADD-NEW-PACK":
            return {...state,
                cardPacks: [ action.pack, ...state.cardPacks]}

        default:
            return state
    }
}
// actions



export const setPacksListAC = (packs:CardPacksType[]) => ({
    type:'packs/SET-PACKS-LIST', packs
} as const)
export const addNewPackAC = (pack: CardPacksType) => ({
    type:'packs/ADD-NEW-PACK', pack
} as const)
export const setUserIdAC = (userId:string) => ({
    type:'packs/SET-USER-ID', userId
} as const)


// thunk
export const getPacksListsTC = ():AppThunkType => {
    return (dispatch: Dispatch<AppActionsType>, getState: ()=> AppRootState ) => {

        dispatch(setStatusAC('loading'))
        const params = getState().packs.params
        cardsApi.getPacksList(params)
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

export const addNewPackTC = ():AppThunkType => {
    return (dispatch, getState) => {

        dispatch(setStatusAC('loading'))
        cardsApi.addNewPack()
            .then((res) => {
             /* dispatch(addNewPackAC(params.nameNewPack))*/

                dispatch(addNewPackAC(res.data.cardPacks.pack))
                dispatch(getPacksListsTC())
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
export type PacksListActionsType = SetPacksListType  | SetUserIdType | AddNewPackType

export type SetPacksListType = ReturnType<typeof setPacksListAC>
export type SetUserIdType = ReturnType<typeof setUserIdAC>
export type AddNewPackType = ReturnType<typeof addNewPackAC>


export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
    deckCover: null | any
}
