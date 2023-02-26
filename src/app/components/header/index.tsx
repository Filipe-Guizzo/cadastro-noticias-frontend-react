import { Link } from "react-router-dom";
import Input from "../input";
import { HeaderProps } from "./interfaces/props";
import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../contexts/auth-context";
import { pessoaService } from "../../services/pessoa/pessoa-service";
import { PessoaProps } from "../../interfaces/pessoa";
import { environment } from "../../environments/environments";
import { buscaContext } from "../../contexts/buscar-context";

export default function Header({buscaInput}:HeaderProps){
    const [ usuario, setUsuario ] = useState<PessoaProps>({nome:'', imagem:'', telefone:'', email:'', senha:''});
    const [ busca, setBusca] = useState('');
    const { setBuscar } = useContext(buscaContext);
    const { clearToken, idUsuario } = useContext(authContext);
    function logout(){
        clearToken();
    }

    function onChangeBusca(e:any){
        const value = e.target.value;
        setBusca(value);
    }

    function onBuscar(){
        setBuscar(busca);
    }

    useEffect(()=>{
        const getUsuario = async()=>{
            const usuario = await pessoaService.listarPorId(idUsuario);
            setUsuario(usuario);
        }
        getUsuario();
    },[])

    return(
        <header className={styles.header}>
            <div className={styles.perfil}>
                <div className={styles.boxFotoPerfil}>
                    <img src={usuario.imagem?environment.urlApi + usuario.imagem:require("../../assets/avatar.jpeg")} alt="foto-perfil" className={styles.fotoPerfil}/>
                </div>
                <h3><Link to={`/atualizar-pessoa/${idUsuario}`}>{usuario?.nome}</Link></h3>
            </div>
            <Input id="busca" name="busca" placeholder="Buscar noticia:" type="text" hidden={!buscaInput} value={busca} onChange={(e)=>{onChangeBusca(e)}} onEnter={onBuscar}/>
            <div className={styles.nav}>
                <nav>
                    <ul>
                        <li className={styles.navItem}>
                            <Link to="/home" className={styles.navLink}>Home</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to="/cadastrar-noticia" className={styles.navLink}>Cadastrar Noticia</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link to="/cadastrar-categoria" className={styles.navLink}>Cadastrar Categoria</Link>
                        </li>
                        <li className={styles.navItem}>
                            <a href="" className={styles.navLink} onClick={logout}>Sair</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}