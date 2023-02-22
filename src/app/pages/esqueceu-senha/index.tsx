import Button from '../../components/button';
import Input from '../../components/input';
import styles from './styles.module.css';
import { useState } from 'react';
import Alert from '../../components/alert';
import Loader from '../../components/loader';

export default function EsqueceuSenha(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [alert, setAlert] = useState({hidden: 'hide',label: '',type: 'danger'});
    const [loader, setLoader] = useState('hide');

    function onChangeEmail(e:any){
        const value = e.target.value;
        setEmail(value);
    }

    async function onClickEnviarCodigo(){
        
    }

    return(
        <div className={styles.container}>
            <div className={styles.box}>
                <h1>Recuperação de senha</h1>
                <br />
                <br />
                <p>Será enviado uma sms para numero cadastrado:</p>
                <br />
                <br />
                <form>
                    <div className={styles.field}>
                        <label htmlFor="email">E-mail:</label>
                        <Input value={email} placeholder='Digite seu e-mail' id='email' name='email' type='email' hidden={false} onChange={(e)=>{onChangeEmail(e)}}/>
                    </div>
                    <div className={styles.field}>
                        <Button label='Entrar' type='button' hidden={false} onClick={onClickEnviarCodigo}/>
                    </div>
                </form>
            </div>
            <Alert label={alert.label} hidden={alert.hidden} type={alert.type}/>
            <Loader hidden={loader}/>
        </div>
    )
}