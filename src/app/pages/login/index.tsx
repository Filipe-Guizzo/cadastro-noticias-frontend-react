import Button from '../../components/button';
import Input from '../../components/input';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LoginService } from '../../services/login/login-service';
import Alert from '../../components/alert';
import Loader from '../../components/loader';
import { authContext } from '../../contexts/auth-context';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [alert, setAlert] = useState({hidden: 'hide',label: '',type: 'danger'});
    const [loader, setLoader] = useState('hide');
    const { setToken, setIsAuth } = useContext(authContext);
    const navigate = useNavigate();

    function onChangeEmail(e:any){
        const value = e.target.value;
        setEmail(value);
    }

    function onChangeSenha(e:any){
        const value = e.target.value;
        setSenha(value);
    }

    async function onClickEntrar(){
        setLoader('show');
        const login = {email: email,senha:senha}
    
        if(login.email === '' || login.senha === ''){
            setAlert({hidden: 'show',label: 'Preencha todos os campos',type: 'danger'})
            setLoader('hide');
        }else{
            const data = await LoginService.login(login);
            if(data?.token){
                setToken(data.token);
                setIsAuth(true);
                setAlert({hidden: 'show',label: 'Logado com sucesso',type: 'success'})
                setLoader('hide');
                navigate("/home");
            }else{
                setAlert({hidden: 'show',label: data?.message!,type: 'danger'})
                setLoader('hide');
            }
        }
        
    }

    return(
        <div className={styles.container}>
            <div className={styles.box}>
                <h1>Login</h1>
                <br />
                <br />
                <form>
                    <div className={styles.field}>
                        <label htmlFor="email">E-mail:</label>
                        <Input value={email} placeholder='Digite seu e-mail' id='email' name='email' type='email' hidden={false} onChange={(e)=>{onChangeEmail(e)}}/>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="senha">Senha:</label>
                        <Input value={senha} placeholder='Digite sua senha' id='senha' name='senha' type='password' hidden={false} onChange={(e)=>{onChangeSenha(e)}}/>
                    </div>
                    <div className={styles.field}>
                        <Button label='Entrar' type='button' hidden={false} onClick={onClickEntrar}/>
                    </div>
                </form>
                <br />
                <br />
                <Link to="/cadastrar-pessoa">Não tem uma conta?</Link>
                <br />
                <Link to="/esqueceu-senha">Esqueceu a senha?</Link>
            </div>
            <Alert label={alert.label} hidden={alert.hidden} type={alert.type}/>
            <Loader hidden={loader}/>
        </div>
    )
}