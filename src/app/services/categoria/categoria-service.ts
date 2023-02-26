import { CategoriaProps } from './../../interfaces/categoria';
import { api } from '../api';

const listar =  async ():Promise<CategoriaProps[]>=>{
    const token = localStorage.getItem('token');
    const data = await api.get("/categorias/", {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const listarPorId =  async (id:number):Promise<CategoriaProps>=>{
    const token = localStorage.getItem('token');
    const data = await api.get(`/categorias/${id}/`, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const criar =  async (categoria: CategoriaProps):Promise<CategoriaProps>=>{
    const token = localStorage.getItem('token');
    const data = await api.post("/categorias/", categoria, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const atualizar =  async (id:number,categoria: CategoriaProps):Promise<CategoriaProps>=>{
    const token = localStorage.getItem('token');
    const data = await api.put(`/categorias/${id}/`, categoria, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}

const deletar =  async (id:number):Promise<any>=>{
    const token = localStorage.getItem('token');
    const data = await api.delete(`/categorias/${id}/`, {headers: {'Authorization': "Bearer " + token}})
    .then(({data})=>{
        return data
    }).catch((erro)=>{
        return erro.response.data
    })
    return data
}


export const categoriaService = {
    listar,
    listarPorId,
    criar,
    atualizar,
    deletar,
}