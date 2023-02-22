import { AlertProps } from "./interfaces/props";
import styles from "./styles.module.css";

export default function Alert({hidden, label, type}:AlertProps){
    return(
        <div className={styles[hidden]}>
            <div className={styles[type]}>
                <p>{label}</p>
            </div>
        </div>
    )
}