import { InputFileProps } from "./interfaces/props";
import styles from "./styles.module.css";

export default function FileInput({id, name,onChange}:InputFileProps){
    return(
        <label htmlFor={name} className={styles.fileInput}>
            Selecionar imagem de perfil
            <input id={id} name={name} type='file' hidden onChange={(e:any)=>{onChange(e)}}/>
        </label>
    )
}