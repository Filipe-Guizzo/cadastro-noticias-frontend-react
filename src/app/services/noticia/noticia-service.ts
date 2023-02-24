import { NoticiaProps } from './../../interfaces/noticia';
import { api } from '../api';

const listar =  async ():Promise<[NoticiaProps[]]>=>{
    const token = localStorage.getItem('token');
    const data = await api.get("/noticias/", {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const listarPorId =  async (id:number):Promise<NoticiaProps>=>{
    const token = localStorage.getItem('token');
    const data = await api.get(`/noticias/${id}/`, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const criar =  async (noticia: NoticiaProps):Promise<NoticiaProps>=>{
    const token = localStorage.getItem('token');
    const data = await api.post("/noticias/", noticia, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const atualizar =  async (id:number,noticia: NoticiaProps):Promise<NoticiaProps>=>{
    const token = localStorage.getItem('token');
    const data = await api.put(`/noticias/${id}`, noticia, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const deletar =  async (id:number):Promise<any>=>{
    const token = localStorage.getItem('token');
    const data = await api.delete(`/noticias/${id}/`, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}


const uploadFile =  async (id:number, file:FormData):Promise<NoticiaProps>=>{
    const token = localStorage.getItem('token');
    const data = await api.post(`/noticias/${id}/upload-file`, file, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}


export const noticiaService = {
    listar,
    listarPorId,
    criar,
    atualizar,
    deletar,
    uploadFile,
}