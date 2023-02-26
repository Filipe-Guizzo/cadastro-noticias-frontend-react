import { PessoaProps } from './../../interfaces/pessoa';
import { ReenviarCodigoProps} from './../../interfaces/reenviar-codigo';
import { RecuperarSenhaProps } from './../../interfaces/recuperar-senha';
import { api } from '../api';
import { AlterarSenhaProps } from '../../interfaces/alterar-senha';

const listar =  async ():Promise<PessoaProps[]>=>{
    const token = localStorage.getItem('token');
    const data = await api.get("/pessoas/", {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const listarPorId =  async (id:number):Promise<PessoaProps>=>{
    const token = localStorage.getItem('token');
    const data = await api.get(`/pessoas/${id}/`, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const criar =  async (pessoa: PessoaProps):Promise<PessoaProps>=>{
    const data = await api.post("/pessoas/", pessoa)
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const atualizar =  async (id:number,pessoa: PessoaProps):Promise<PessoaProps>=>{
    const token = localStorage.getItem('token');
    const data = await api.put(`/pessoas/${id}/`, pessoa, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const deletar =  async (id:number):Promise<any>=>{
    const token = localStorage.getItem('token');
    const data = await api.delete(`/pessoas/${id}/`, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}


const uploadFile =  async (id:number, file:FormData):Promise<PessoaProps>=>{
    const token = localStorage.getItem('token');
    const data = await api.post(`/pessoas/${id}/upload-file`, file, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}


const recuperarSenha =  async (recuperarSenha: RecuperarSenhaProps):Promise<RecuperarSenhaProps >=>{
    const data = await api.post("/pessoas/enviar-sms/", recuperarSenha)
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const reenviarCodigo =  async (reenviarCodigo: ReenviarCodigoProps):Promise<RecuperarSenhaProps>=>{
    const data = await api.post("/pessoas/reenviar-sms/", reenviarCodigo)
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const alterarSenha =  async (alterarSenha: AlterarSenhaProps):Promise<AlterarSenhaProps>=>{
    const data = await api.post("/pessoas/resetar-senha/", alterarSenha)
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}


export const pessoaService = {
    listar,
    listarPorId,
    criar,
    atualizar,
    deletar,
    uploadFile,
    recuperarSenha,
    reenviarCodigo,
    alterarSenha,
}