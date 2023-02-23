import { RecuperarSenhaProps } from './../../interfaces/recuperar-senha';
import { api } from '../api';

const recuperarSenha =  async (recuperarSenha: RecuperarSenhaProps):Promise<RecuperarSenhaProps >=>{
    const data = await api.post("/pessoas/enviar-sms/", recuperarSenha)
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}


export const pessoaService = {
    recuperarSenha
}