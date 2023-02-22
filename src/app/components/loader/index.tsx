import { LoaderProps } from "./interfaces/props";
import styles from "./styles.module.css";

export default function Loader({hidden}:LoaderProps){
    return(
        <div className={styles[hidden]}></div>
    )
}