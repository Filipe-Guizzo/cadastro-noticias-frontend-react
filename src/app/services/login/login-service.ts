import { api } from './../api';
import { LoginProps } from './../../interfaces/login';

const login =  async (login: LoginProps):Promise<LoginProps>=>{
    const data = await api.post("/auth/login", login)
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}


export const LoginService = {
    login
}