import { authContext } from './../contexts/auth-context';
import { useContext } from "react";


export const useAuthUser = ()=>{
    const { token } = useContext(authContext);
    if(token != null ||token != undefined || token != ''){
        return true;
    }else{
        return false;
    }
}

