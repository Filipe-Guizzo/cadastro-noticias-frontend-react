import { environment } from './../environments/environments';
import axios from "axios";

export const api = axios.create({
    baseURL: environment.urlApi  
})