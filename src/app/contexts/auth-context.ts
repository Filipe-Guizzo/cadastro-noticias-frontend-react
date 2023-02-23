import { createContext } from "react";

export const authContext = createContext({
    token: '',
    setToken: (token:string)=>{},
    clearToken: ()=>{},
    isAuth: false,
    setIsAuth: (value:boolean)=>{}
})