import axios from "axios";


export const instance = axios.create({
        baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
        withCredentials: true,
    })

// baseURL: 'https://neko-back.herokuapp.com/2.0/'
//http://localhost:7542/2.0/


// api
export const authAPI = {
    login(data: LoginParamsType) {
      return instance.post<LoginResponseType>('/auth/login', data)
    },
    me(){
    },
    logout(){
        return instance.delete('auth/me')
    },
    registration(email: string, password: string){
        return instance.post('auth/register', {email, password})
    }
}


// types
export type RegParamsType = {
    email: string,
    password: string,

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
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;

}