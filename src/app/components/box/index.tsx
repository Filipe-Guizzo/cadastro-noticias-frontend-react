import { BoxProps } from "./interfaces/props";
import styles from "./styles.module.css";

export default function Box({children}:BoxProps){
    return(
        <div className={styles.box}>
            {children}
        </div>
    )
}