import {cardApi} from "../../api/cards-api";
import {setStatusAC} from "../../app/app-reducer";
import {AppActionsType, AppThunkType} from "../../redux/store";
import {isError} from "../Login/login-reducer";
import {Dispatch} from "redux";




const initialState = {
    cards:[] as Array<CardType>,
    cardsTotalCount: 5,
    packUserId: '',
    params: {
        cardAnswer:'',
        cardQuestion: '',
        cardsPack_id: '',
        min: 1 ,
        max: 8,
        page: 1,
        pageCount: 7
    }
}
type InitialStateType = typeof initialState


export const cardsReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    debugger
    switch (action.type) {
        case "cards/SET-CARDS-LIST":
            return {...state, cards: action.cards}

        case 'cards/SET-CARDS-TOTAL-COUNT':
            return {...state,cardsTotalCount: action.cardsTotalCount}
        case 'cards/SET-CARDS-PAGE-COUNT':
            return {...state, params: {...state.params, pageCount: action.pageCount}}
        default:
            return state
    }
}
// actions



export const setCardsListAC = (cards:CardType[]) => ({
    type:'cards/SET-CARDS-LIST', cards
} as const)
export const setCardsTotalCountAC = (cardsTotalCount:number) => ({
    type:'cards/SET-CARDS-TOTAL-COUNT', cardsTotalCount
} as const)
export const setCardsPageCountAC = (pageCount:number) => ({
    type:'cards/SET-CARDS-PAGE-COUNT', pageCount
} as const)




// thunk
export const getCardsListsTC = (cardsPack_id:string):AppThunkType => {
    return (dispatch: Dispatch<AppActionsType>, getState ) => {
        const params = getState().packs.params
        dispatch(setStatusAC('loading'))

        cardApi.getCardsList(cardsPack_id,params)
            .then((res) => {

                dispatch(setCardsListAC(res.data.cards))
                dispatch(setCardsPageCountAC(res.data.cards.params.pageCount))
            console.log(res.data.cards)
                dispatch(setStatusAC('succeeded'))
            })
            .catch(err => {
                const error = err.response
                    ? err.response.data.error
                    : (err.message + ', more details in the console');
                dispatch(isError(error))
                setTimeout(() => {
                    dispatch(isError(''))
                }, 5000)
                dispatch(setStatusAC('failed'))

            })
    }
}


export const addCardTC = (cardsPackId:string,questionCard: string):AppThunkType => {
    return (dispatch, getState) => {
        dispatch(setStatusAC('loading'))
        cardApi.addCard(cardsPackId,questionCard)
            .then((res) => {
                dispatch(getCardsListsTC(cardsPackId))
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
export const deleteCardTC = (cardId: string, cardsPackId:string):AppThunkType => {
    return (dispatch, getState) => {
        dispatch(setStatusAC('loading'))
        cardApi.deleteCard(cardId)
            .then((res) => {
                dispatch(getCardsListsTC(cardsPackId))
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

export const updateCardTC = (cardId: string, cardsPackId:string, question: string):AppThunkType => {
    return (dispatch, getState) => {
        dispatch(setStatusAC('loading'))
        cardApi.updateCard(cardId, question)
            .then((res) => {
                dispatch(getCardsListsTC(cardsPackId))
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
export type CardsListActionsType = SetCardsListType | SetCardsTotalCountType | SetCardsPageCountACType

export type SetCardsListType = ReturnType<typeof setCardsListAC>
export type SetCardsTotalCountType = ReturnType<typeof setCardsTotalCountAC>
export type SetCardsPageCountACType = ReturnType<typeof setCardsPageCountAC>



export type CardType = {
            answer: string
            question: string
            cardsPack_id: string
            grade: number
            shots: number
            user_id: string
            created: string
            updated: string
            _id: string
}
