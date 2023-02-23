import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { authContext } from "../contexts/auth-context";
import Home from "../pages/home";
import Login from "../pages/login";
import EsqueceuSenha from "../pages/esqueceu-senha";
import AlterarSenha from "../pages/alterar-senha";
import CadastrarPessoa from "../pages/cadastrar-pessoa";

export default function Rotas(){
    const [authToken, setAuthToken] = useState(localStorage.getItem('token')!)
    const [isAuth, setIsAuth] = useState(authToken?true:false)
    const onChangeToken = useCallback((token:string)=>{
        localStorage.setItem('token', token);
        setAuthToken(token);
    },[])

    function clearToken(){
        localStorage.clear();
        setAuthToken('');
        setIsAuth(false);
    }

    const onChangeIsAuth = useCallback((value:boolean)=>{
        setIsAuth(value);
    },[])

    return(
        <authContext.Provider value={{token:authToken, setToken:onChangeToken, clearToken:clearToken, isAuth:isAuth, setIsAuth:onChangeIsAuth}}>
            <BrowserRouter>
                {
                    isAuth?
                    <Routes>
                        <Route path="/home" element={<Home/>} />
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