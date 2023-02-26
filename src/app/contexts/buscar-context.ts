import { createContext } from "react";

export const buscaContext = createContext({
    termo: '',
    setBuscar: (busca:string)=>{},
})