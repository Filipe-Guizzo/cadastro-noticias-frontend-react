import { ButtonProps } from "./interfaces/props";
import styles from "./styles.module.css";

export default function Button({label, type, hidden, onClick}:ButtonProps){
    return(
        <button type={type} hidden={hidden} onClick={onClick} className={styles.button}>
            {label}
        </button>
    )
}