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
      return instance.post<LoginResponseType>('/auth/login', {...data})
    },
    authMe(){
        return instance.post<LoginResponseType>('/auth/me',{})
    },
    logout(){
        return instance.delete<logOutType>('auth/me')
    },
    registration(email: string, password: string){
        return instance.post<RegistrationResponseType>('auth/register', {email, password})
    },
    updateUserData(name:string, avatar: string) {
        return instance.put('auth/me', {name,avatar })
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


// types
type RegistrationResponseType = {
    addedUser: addedUserType
    error?: string
}
type addedUserType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: 0,
    created: string,
    updated: string,
    __v: number
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