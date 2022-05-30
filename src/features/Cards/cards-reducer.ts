
import {cardApi} from "../../api/cards-api";
import {setStatusAC} from "../../app/app-reducer";
import {AppActionsType, AppThunkType} from "../../redux/store";
import {isError} from "../Login/login-reducer";
import {Dispatch} from "redux";


const initialState = {
    cards:[] as Array<CardType>,
    cardsTotalCount: 3,
    packUserId: '',
    params: {
        cardAnswer:'',
        cardQuestion: '',
        cardsPack_id: '',
        min: 1 ,
        max: 4,
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


        default:
            return state
    }
}
// actions



export const setCardsListAC = (cards:CardType[]) => ({
    type:'cards/SET-CARDS-LIST', cards
} as const)




// thunk
export const getCardsListsTC = (cardsPack_id:string):AppThunkType => {
    return (dispatch: Dispatch<AppActionsType> ) => {

        dispatch(setStatusAC('loading'))

        cardApi.getCardsList(cardsPack_id)
            .then((res) => {

                dispatch(setCardsListAC(res.data.cards))
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



//type
export type CardsListActionsType = SetCardsListType

export type SetCardsListType = ReturnType<typeof setCardsListAC>



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
