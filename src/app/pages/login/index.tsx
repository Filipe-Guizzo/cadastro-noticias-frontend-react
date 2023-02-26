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
import Box from '../../components/box';
import Field from '../../components/field';
import Container from '../../components/container';

export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [alert, setAlert] = useState({hidden: 'hide',label: '',type: 'danger'});
    const [loader, setLoader] = useState('hide');
    const { setToken, setIsAuth, setIdUsuario } = useContext(authContext);
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
                setIdUsuario(data.id_pessoa!);
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
        <Container>
            <Box>
                <h1>Login</h1>
                <br />
                <br />
                <form>
                    <Field>
                        <label htmlFor="email">E-mail:</label>
                        <Input value={email} placeholder='Digite seu e-mail' id='email' name='email' type='email' hidden={false} onChange={(e)=>{onChangeEmail(e)}} onEnter={()=>{}}/>
                    </Field>
                    <Field>
                        <label htmlFor="senha">Senha:</label>
                        <Input value={senha} placeholder='Digite sua senha' id='senha' name='senha' type='password' hidden={false} onChange={(e)=>{onChangeSenha(e)}} onEnter={()=>{}}/>
                    </Field>
                    <Field>
                        <Button label='Entrar' type='button' hidden={false} onClick={onClickEntrar}/>
                    </Field>
                </form>
                <br />
                <br />
                <Link to="/cadastrar-pessoa">Não tem uma conta?</Link>
                <br />
                <Link to="/esqueceu-senha">Esqueceu a senha?</Link>
            </Box>
            <Alert label={alert.label} hidden={alert.hidden} type={alert.type}/>
            <Loader hidden={loader}/>
        </Container>
    )
}