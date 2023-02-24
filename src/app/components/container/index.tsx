import { ContainerProps } from "./interfaces/props";
import styles from "./styles.module.css";

export default function Container({children}:ContainerProps){
    return(
        <div className={styles.container}>
            {children}
        </div>
    )
}