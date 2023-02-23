import { Link } from "react-router-dom";
import Input from "../input";
import { HeaderProps } from "./interfaces/props";
import styles from "./styles.module.css";

export default function Header({buscaInput}:HeaderProps){
    return(
        <header className={styles.header}>
            <div className={styles.perfil}>
                <img src="" alt="foto-perfil" className={styles.fotoPerfil}/>
                <h1>
                    Nome usuario
                </h1>
            </div>
            <Input id="busca" name="busca" placeholder="Buscar noticia:" type="text" hidden={!buscaInput} value={null} onChange={()=>{}}/>
            <div className={styles.nav}>
                <nav>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/home">Cadastrar Noticia</Link>
                        </li>
                        <li>
                            <Link to="/home">Cadastrar Categoria</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}