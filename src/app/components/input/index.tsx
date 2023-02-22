import { InputProps } from "./interfaces/props";
import styles from "./styles.module.css";

export default function Input({id, name, type, placeholder, hidden, value, onChange}:InputProps){
    return(
        <input value={value} id={id} name={name} type={type} placeholder={placeholder} hidden={hidden} onChange={(e:any)=>{onChange(e)}} className={styles.input}/>
    )
}