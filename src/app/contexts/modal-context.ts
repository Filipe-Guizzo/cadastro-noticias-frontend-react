import { createContext } from "react";

export const modalContext = createContext({
    modal: '',
    setModal: (hidden:string)=>{},
})