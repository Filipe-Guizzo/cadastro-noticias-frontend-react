import { useContext } from "react";
import { modalContext } from "../../contexts/modal-context";
import { noticiaService } from "../../services/noticia/noticia-service";
import { ModalProps } from "./interfaces/props";
import styles from "./styles.module.css";

export default function Modal({id, titulo}:ModalProps){
    const { modal, setModal } = useContext(modalContext);
    async function onClickDeletar(){
        await noticiaService.deletar(id);
        setModal('hide');
        window.location.reload();

    }

    return(
        <div className={styles[modal]}>
            <div className={styles.modal}>
                <header className={styles.modalHeader}>
                    <h1>{titulo}</h1>
                    <br />
                </header>
                <br />
                <footer className={styles.modalFooter}>
                    <button className={styles.buttonCancelar} onClick={()=>{
                        setModal('hide');
                    }}>Cancelar</button>
                    <button className={styles.buttonDeletar} onClick={onClickDeletar}>Deletar</button>
                </footer>
            </div>
        </div>
    )
}