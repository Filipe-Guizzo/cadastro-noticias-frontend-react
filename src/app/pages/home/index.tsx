import Header from '../../components/Header';
import styles from './styles.module.css';

export default function Home(){
    return(
        <div>
            <Header buscaInput={true}/>
            <h1>Home</h1>
        </div>
    )
}