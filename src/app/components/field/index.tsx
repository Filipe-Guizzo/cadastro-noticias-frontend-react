import { FieldProps } from "./interfaces/props";
import styles from "./styles.module.css";

export default function Field({children}:FieldProps){
    return(
        <div className={styles.field}>
            {children}
        </div>
    )
}