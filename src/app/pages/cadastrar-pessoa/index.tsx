import Button from '../../components/button';
import Input from '../../components/input';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import Alert from '../../components/alert';
import Loader from '../../components/loader';
import { authContext } from '../../contexts/auth-context';
import { pessoaService } from '../../services/pessoa/pessoa-service';
import { useNavigate } from 'react-router-dom';
import FileInput from '../../components/file-input';
import Box from '../../components/box';
import Field from '../../components/field';

export default function CadastrarPessoa(){
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmar, setSenhaConfirmar] = useState('');
    const [imagem, setImagem] = useState(null);
    const navigate = useNavigate();

    const [alert, setAlert] = useState({hidden: 'hide',label: '',type: 'danger'});
    const [loader, setLoader] = useState('hide');
    const { setToken, setIsAuth, setIdUsuario } = useContext(authContext);

    function onChangeNome(e:any){
        const value = e.target.value;
        setNome(value);
    }

    function onChangeTelefone(e:any){
        const value = e.target.value;
        setTelefone(value);
    }

    function onChangeEmail(e:any){
        const value = e.target.value;
        setEmail(value);
    }

    function onChangeSenha(e:any){
        const value = e.target.value;
        setSenha(value);
    }

    function onChangeSenhaConfirmar(e:any){
        const value = e.target.value;
        setSenhaConfirmar(value);
    }

    function onChangeImagem(e:any){
        const value = e.target.files[0];
        setImagem(value);
    }

    async function onClickCadastrar(){
        setLoader('show');
        const pessoa = {
            nome: nome,
            telefone: telefone,
            email: email,
            senha:senha}
    
        if( pessoa.nome === '' ||
            pessoa.telefone === '' ||
            pessoa.email === '' || 
            pessoa.senha === '' ||
            senhaConfirmar === '' ||
            imagem === null
            ){
            setAlert({hidden: 'show',label: 'Preencha todos os campos',type: 'danger'})
            setLoader('hide');
        }else{
            if(pessoa.senha !== senhaConfirmar ){
                setAlert({hidden: 'show',label: 'Senhas diferentes',type: 'danger'})
                setLoader('hide');
            }else{
                const data = await pessoaService.criar(pessoa);
                if(data?.token){
                    setToken(data.token);
                    setIdUsuario(data.id!);
                    const form = new FormData();
                    form.append("file", imagem);
                    await pessoaService.uploadFile(data?.id!, form);
                    setIsAuth(true);
                    setAlert({hidden: 'show',label: 'Cadastrado com sucesso',type: 'success'})
                    setLoader('hide');
                    navigate('/home');
                }else{
                    setAlert({hidden: 'show',label: 'Erro interno',type: 'danger'})
                    setLoader('hide');
                }
            }
        }
        
    }

    return(
        <div className={styles.container}>
            <Box>
                <h1>Cadastro</h1>
                <br />
                <br />
                <form>
                    <Field>
                        <label htmlFor="nome">Nome:</label>
                        <Input value={nome} placeholder='Digite seu nome' id='nome' name='nome' type='text' hidden={false} onChange={(e)=>{onChangeNome(e)}} onEnter={()=>{}}/>
                    </Field>
                    <Field>
                        <label htmlFor="telefone">Telefone:</label>
                        <Input value={telefone} placeholder='Digite seu telefone' id='telefone' name='telefone' type='text' hidden={false} onChange={(e)=>{onChangeTelefone(e)}} onEnter={()=>{}}/>
                    </Field>
                    <Field>
                        <label htmlFor="email">E-mail:</label>
                        <Input value={email} placeholder='Digite seu e-mail' id='email' name='email' type='email' hidden={false} onChange={(e)=>{onChangeEmail(e)}} onEnter={()=>{}}/>
                    </Field>
                    <Field>
                        <label htmlFor="senha">Senha:</label>
                        <Input value={senha} placeholder='Digite sua senha' id='senha' name='senha' type='password' hidden={false} onChange={(e)=>{onChangeSenha(e)}} onEnter={()=>{}}/>
                    </Field>
                    <Field>
                        <label htmlFor="senha-confirmar">Senha:</label>
                        <Input value={senhaConfirmar} placeholder='Digite sua senha novamente' id='senha-confirmar' name='senha-confirmar' type='password' hidden={false} onChange={(e)=>{onChangeSenhaConfirmar(e)}} onEnter={()=>{}}/>
                    </Field>
                    <Field>
                        <FileInput id='imagem'  name='imagem' onChange={(e)=>{onChangeImagem(e)}}/>
                    </Field>
                    <Field>
                        <Button label='Cadastrar' type='button' hidden={false} onClick={onClickCadastrar}/>
                    </Field>
                </form>
                <br />
                <br />
                <Link to="/login">J?? possui uma conta?</Link>
            </Box>
            <Alert label={alert.label} hidden={alert.hidden} type={alert.type}/>
            <Loader hidden={loader}/>
        </div>
    )
}