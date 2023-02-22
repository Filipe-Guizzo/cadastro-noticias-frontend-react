import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { authContext } from "../contexts/auth-context";
import { useAuthUser } from "../hooks/auth-user";
import Home from "../pages/home";
import Login from "../pages/login";
import EsqueceuSenha from "../pages/esqueceu-senha";

export default function Rotas(){
    const [authToken, setAuthToken] = useState(localStorage.getItem('token')!)
    const onChangeToken = useCallback((token:string)=>{
        localStorage.setItem('token', token);
        setAuthToken(token);
    },[])

    const authUser = useAuthUser();

    return(
        <authContext.Provider value={{token:authToken, setToken:onChangeToken}}>
            <BrowserRouter>
                {
                    !authUser?
                    <Routes>
                        <Route path="/home" element={<Home/>} />
                        <Route path="*" element={<Navigate to="/home"/>} />
                    </Routes>
                    :
                    <Routes>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/esqueceu-senha" element={<EsqueceuSenha/>} />
                        <Route path="*" element={<Navigate to="/login"/>} />
                    </Routes>
                }   
            </BrowserRouter>
        </authContext.Provider>
    )
}