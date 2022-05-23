import axios from "axios";


export const instance = axios.create({
    baseURL:'https://neko-back.herokuapp.com/2.0/',
      /*  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',*/
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

export const cardsApi = {
    getPacksList(params: PacksParamsType){
        return instance.get<PacksListResponseType>(('/cards/pack'), {params})}
}


// types

export type PacksParamsType = {
    min: number,
    max: number,
    page: number,
    pageCount: number,
    sortPacks: string,
    packName: string,
    user_id: string}

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