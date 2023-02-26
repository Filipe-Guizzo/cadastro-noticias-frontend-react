import { CategoriaProps } from './categoria';
import { PessoaProps } from './pessoa';
export interface NoticiaProps{
    id?:number
    titulo:string
    conteudo: string
    id_pessoa: number
    id_categoria:number
    imagem?:string
    pessoa?: PessoaProps
    categoria?: CategoriaProps
}