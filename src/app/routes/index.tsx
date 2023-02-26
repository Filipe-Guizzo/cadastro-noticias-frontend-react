import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { authContext } from "../contexts/auth-context";
import Home from "../pages/home";
import Login from "../pages/login";
import EsqueceuSenha from "../pages/esqueceu-senha";
import AlterarSenha from "../pages/alterar-senha";
import CadastrarPessoa from "../pages/cadastrar-pessoa";
import CadastrarCategoria from "../pages/cadastrar-categoria";
import CadastrarNoticia from "../pages/cadastrar-noticia";
import AtualizarNoticia from "../pages/atualizar-noticia";
import AtualizarPessoa from "../pages/atualizar-pessoa";

export default function Rotas(){
    const [authToken, setAuthToken] = useState(localStorage.getItem('token')!)
    const [isAuth, setIsAuth] = useState(authToken?true:false)
    const [idUsuario, setIdUsuario] = useState(Number(localStorage.getItem("idUsuario")))
    const onChangeToken = useCallback((token:string)=>{
        localStorage.setItem('token', token);
        setAuthToken(token);
    },[])

    function clearToken(){
        localStorage.clear();
        setAuthToken('');
        setIsAuth(false);
        setIdUsuario(0);
    }

    const onChangeIsAuth = useCallback((value:boolean)=>{
        setIsAuth(value);
    },[])

    const onChangeIdUsuario = useCallback((value:number)=>{
        localStorage.setItem('idUsuario', String(value));
        setIdUsuario(value);
    },[])

    return(
        <authContext.Provider value={{token:authToken, setToken:onChangeToken, clearToken:clearToken, isAuth:isAuth, setIsAuth:onChangeIsAuth, idUsuario:idUsuario, setIdUsuario:onChangeIdUsuario}}>
            <BrowserRouter>
                {
                    isAuth?
                    <Routes>
                        <Route path="/home" element={<Home/>} />
                        <Route path="/cadastrar-categoria" element={<CadastrarCategoria/>} />
                        <Route path="/cadastrar-noticia" element={<CadastrarNoticia/>} />
                        <Route path="/atualizar-noticia/:idNoticia" element={<AtualizarNoticia/>} />
                        <Route path="/atualizar-pessoa/:idUsuario" element={<AtualizarPessoa/>} />
                        <Route path="*" element={<Navigate to="/home"/>} />
                    </Routes>
                    :
                    <Routes>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/cadastrar-pessoa" element={<CadastrarPessoa/>} />
                        <Route path="/esqueceu-senha" element={<EsqueceuSenha/>} />
                        <Route path="/pessoas/:idPessoa/alterar-senha/" element={<AlterarSenha/>} />
                        <Route path="*" element={<Navigate to="/login"/>} />
                    </Routes>
                }   
            </BrowserRouter>
        </authContext.Provider>
    )
}