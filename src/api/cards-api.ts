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
    updateUserData(name: string) {
            return instance.put('auth/me',{name} )
    },
    updateUserAvatar(avatar: string) {
        return instance.put('auth/me',{avatar} )
    }
}


// types


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