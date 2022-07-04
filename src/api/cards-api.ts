import axios from "axios";
import {CardType} from "../features/Cards/cards-reducer";


export const instance = axios.create({
    baseURL:'https://neko-back.herokuapp.com/2.0/',
       /* baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',*/
        withCredentials: true,
    })

// baseURL: 'https://neko-back.herokuapp.com/2.0/'
//http://localhost:7542/2.0/


// api
export const authAPI = {
    login(data: LoginParamsType) {
      return instance.post<LoginResponseType>('/auth/login', data)
    },
    authMe(){
        return instance.post<LoginResponseType>('/auth/me',{})
    },
    logout(){
        return instance.delete<logOutType>('auth/me')
    },
    registration(email: string, password: string){
        return instance.post('auth/register', {email, password})
    },
    updateUserData(name:string, avatar: string) {
        return instance.put('auth/me', {name,avatar})
    },
    forgotPassword(email: string) {
            return instance.post<ForgotDataType>('/auth/forgot', {
            email, from: '<maryia.jegorova@gmail.com>',
                message: `<div style="background-color: #d0eca1; padding: 20px; border-radius: 15px">This is a password recovery link: <a href='https://MariStakhovskaya.github.io/questionCards/#/reset/$token$'>link</a></div>`
        })
    },
    createNewPassword(password: string, resetPasswordToken: string){
        return instance.post('/auth/set-new-password',{password, resetPasswordToken})
    }
}

export const packsApi = {
    getPacksList(params: PacksParamsType){
        return instance.get<PacksListResponseType>(('/cards/pack'), {params})},

    addNewPack(newNamePack: string){
        return instance.post('/cards/pack',  {
            cardsPack: {
                name: newNamePack,
                deckCover: '',
                private: false
            }
        })
    },
    deleteMyPack(packId: string){
            return instance.delete(`cards/pack?id=${packId}`)
    },
    updateMyPack(packId: string, updateNamePack: string){
        return instance.put('cards/pack', {
            cardsPack: {
                name: updateNamePack,
                deckCover: '',
                private: false,
                _id: packId
            }
        })
    }}

export const cardApi = {
    getCardsList(cardsPack_id:string){
        return instance.get<CardsResponseType>((`/cards/card?cardsPack_id=${cardsPack_id}`),)},

    addCard(cardsPackId:string,questionCard: string){
        return instance.post('/cards/card',{
            card: {
                cardsPack_id:cardsPackId,
                question:questionCard
            }
        })
    },
    deleteCard(cardId: string){
        return instance.delete( `/cards/card?id=${cardId}`)
    },
    updateCard(cardId: string, question: string, answer: string){
        return instance.put('/cards/card', {
            card: {
                _id: cardId,
                question: question,
                answer: answer
            }
        })
    }
}


// types

export type AddPackParamsType = {
    cardsPack: {
        name: string
        deckCover?: string
        private?: boolean
        packId?: string
    }
}

export type PacksParamsType = {
    min: number,
    max: number,
    page: number,
    pageCount: number,
    sortPacks: string,
    packName: string,
    user_id: string}

export type CardsParamsType= {
    cardAnswer:string,
        cardQuestion: string,
        cardsPack_id:string ,
        min: number,
        max: number,
        page: number,
        pageCount: number
}

type cardType = "pack" | "folder"

export type CardPacksType = {
    _id: string,
    user_id:string,
cardsCount: number
created: string
grade: number // средняя оценка карточек
more_id: string
name: string
path: string // папка
private: false
rating: number // лайки
shots: number // количество попыток
type: cardType
updated: string
user_name: string
__v: number
}
export type CardsResponseType= {
    cards: Array<CardType>,
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}



type PacksListResponseType = {
    cardPacks:CardPacksType[],
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}


type logOutType = {
    info: string,
    error: string
}

export type ForgotDataType = {
    email: string
    from: string
    message: string
}
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean,
}

export type LoginResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    publicCardPacksCount: number; // количество колод
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error: string;

}