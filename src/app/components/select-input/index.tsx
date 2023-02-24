import { SelectInputProps } from "./interfaces/props";
import styles from "./styles.module.css";

export default function SelectInput({id, name, placeholder, children, value, onChange}:SelectInputProps){
    return(
        <select value={value} id={id} name={name} onChange={(e:any)=>{onChange(e)}} className={styles.input}>
            <option value={-1}>{placeholder}</option>
            {children}
        </select>
    )
}