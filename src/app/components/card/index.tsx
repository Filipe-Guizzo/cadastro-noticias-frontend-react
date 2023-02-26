import { environment } from "../../environments/environments";
import { CardProps } from "./interfaces/props";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import Modal from "../modal";
import { modalContext } from "../../contexts/modal-context"
export default function Card({id, titulo, categoria, conteudo, imagem, pessoa, }:CardProps){
    const nativate = useNavigate();
    const [ modal, setModal] =  useState('hide');
    const onChangeModal = useCallback((hidden:string)=>{
        setModal(hidden);
    },[])
    return(
        <>
        
        <div className={styles.card} key={id}>
            <img src={environment.urlApi + imagem} alt="foto-noticia" />
            <header className={styles.cardHeader}>
                <h1>{titulo}</h1>
                <p>{categoria}</p>
                <br />
            </header>
            <div className={styles.cardBody}>
                <p>{conteudo}</p>
                <br />
                <p>Por: {pessoa}</p>
            </div>
            <br />
            <footer className={styles.cardFooter}>
                <button className={styles.buttonEditar} onClick={()=>{
                    nativate(`/atualizar-noticia/${id}`);
                }}>Atualizar</button>
                <button className={styles.buttonDeletar} onClick={()=>{
                    setModal('show')}}>Deletar</button>
            </footer>
        </div>
        <modalContext.Provider value={{modal:modal, setModal:onChangeModal}}>
            <Modal id={id} titulo="Deseja deletar essa noticia?"/>
        </modalContext.Provider>
        </>
    )
}