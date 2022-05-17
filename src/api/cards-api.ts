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
        return instance.post<{data:LoginResponseType}>('/auth/me',{})
    },
    logout(){
        return instance.delete('auth/me')
    },
    registration(email: string, password: string){
        return instance.post('auth/register', {email, password})
    },
    updateUserData(name:string, avatar: string) {
        return instance.put('auth/me', {name,avatar })
    },
    forgotPassword(email: string) {
            return instance.post<ForgotDataType>('/auth/forgot', {
            email, from: '<maryia.jegorova@gmail.com>',
                message: `<div style="background-color: #d0eca1; padding: 20px; border-radius: 15px">This is a password recovery link: <a href=<a href='http://localhost:3000/#/reset/$token$'>>link</a></div>`
        })
    },
    createNewPassword(password: string, token: string){
        return instance.post('/auth/set-new-password',{password, token})

    }
}


// types

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