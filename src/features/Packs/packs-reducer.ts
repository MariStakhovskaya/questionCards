import {CardPacksType, packsApi, PacksParamsType} from "../../api/cards-api";
import {setStatusAC} from "../../app/app-reducer";
import {AppActionsType, AppRootState, AppThunkType} from "../../redux/store";
import {isError} from "../Login/login-reducer";
import {Dispatch} from "redux";


const initialState = {
    cardPacks: [] as CardPacksType[],
    cardPacksTotalCount: 14, // количество колод
    maxCardsCount: 4,
    minCardsCount: 4,

    params: {
        min: 0,
        max: 10,
        page: 1,
        pageCount: 10, // Количество элементов на странице
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
        case 'packs/SET-CARD-PACK-TOTAL-COUNT':
            return {...state,cardPacksTotalCount: action.cardPacksTotalCount}
        case 'packs/SET-CURRENT-PAGE':
            return {...state,params:{...state.params, page: action.page}}
        case 'packs/SORT-PACK':
            return {...state,params:{...state.params, sortPacks: action.sort}}

        default:
            return state
    }
}
// actions
export const setPacksListAC = (packs:CardPacksType[]) => ({
    type:'packs/SET-PACKS-LIST', packs
} as const)


export const setUserIdAC = (userId:string) => ({
    type:'packs/SET-USER-ID', userId
} as const)
export const setCardPackTotalCountAC = (cardPacksTotalCount:number) => ({
    type:'packs/SET-CARD-PACK-TOTAL-COUNT', cardPacksTotalCount
} as const)
export const setCurrentPageAC = (page:number) => ({
    type:'packs/SET-CURRENT-PAGE', page
} as const)
export const sortPackAC = (sort: string) => ({
    type:'packs/SORT-PACK', sort
} as const)


// thunk
export const getPacksListsTC = ():AppThunkType => {
    return (dispatch: Dispatch<AppActionsType>, getState: ()=> AppRootState ) => {

        dispatch(setStatusAC('loading'))
        const params = getState().packs.params
        packsApi.getPacksList(params)
            .then((res) => {

                dispatch(setPacksListAC(res.data.cardPacks))
                dispatch(setCardPackTotalCountAC(res.data.cardPacksTotalCount))
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

export const addNewPackTC = (newNamePack: string):AppThunkType => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        packsApi.addNewPack(newNamePack)
            .then((res) => {

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

export const updatePackTC = (packId: string, updateNamePack: string):AppThunkType => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        packsApi.updateMyPack(packId,updateNamePack)
            .then((res) => {
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

export const deleteUserPackTC = (packId: string):AppThunkType => {
    return (dispatch) => {
        dispatch(setStatusAC('loading'))
        packsApi.deleteMyPack(packId)
            .then((res) => {
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
export type PacksListActionsType = SetPacksListType  | SetUserIdType  | SetCardPackTotalCountType | SetCurrentPageType |SortPackType

export type SetPacksListType = ReturnType<typeof setPacksListAC>
export type SetUserIdType = ReturnType<typeof setUserIdAC>
export type SetCardPackTotalCountType = ReturnType<typeof setCardPackTotalCountAC>
export type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>
export type SortPackType = ReturnType<typeof sortPackAC>



