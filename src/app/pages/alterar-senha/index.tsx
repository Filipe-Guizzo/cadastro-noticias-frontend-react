import Button from '../../components/button';
import Input from '../../components/input';
import styles from './styles.module.css';
import { useState } from 'react';
import Alert from '../../components/alert';
import Loader from '../../components/loader';
import { pessoaService } from '../../services/pessoa/pessoa-service';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '../../components/box';
import Field from '../../components/field';
import Container from '../../components/container';

export default function AlterarSenha(){
    const [senha , setSenha] = useState('');
    const [senhaConfirmar , setSenhaConfirmar] = useState('');
    const [alert, setAlert] = useState({hidden: 'hide',label: '',type: 'danger'});
    const [loader, setLoader] = useState('hide');
    const { idPessoa } = useParams();
    const navigate = useNavigate();

    function onChangeSenha(e:any){
        const value = e.target.value;
        setSenha(value);
    }

    function onChangeSenhaConfirmar(e:any){
        const value = e.target.value;
        setSenhaConfirmar(value);
    }

    async function onClickAlterarSenha(){
        setLoader('show');
        const alterarSenha = {
            senha:senha,
            id_pessoa:  Number(idPessoa)
        }
        if(senha === '' || senhaConfirmar === ''){
            setAlert({hidden: 'show',label: 'Preencha todos os campos',type: 'danger'});
        }else{
            if(senha !== senhaConfirmar){
                setAlert({hidden: 'show',label: 'Senhas diferentes',type: 'danger'});
            }else{
                const data = await pessoaService.alterarSenha(alterarSenha);

                if(data?.status === 200){
                    setAlert({hidden: 'show',label: data?.message!,type: 'success'});
                    navigate("/login");
                }else{
                    setAlert({hidden: 'show',label: data?.message!,type: 'danger'});
                }
            }
        }
        setLoader('hide')
    }

    return(
        <Container>
            <Box>
                <h1>Recuperação de senha</h1>
                <br />
                <br />
                <form>
                    <Field>
                        <label htmlFor="senha">Nova senha:</label>
                        <Input value={senha} placeholder='Digite uma nova senha' id='senha' name='senha' type='password' hidden={false} onChange={(e)=>{onChangeSenha(e)}} onEnter={()=>{}}/>
                    </Field>
                    <Field>
                        <label htmlFor="codigo">Confirmar senha:</label>
                        <Input value={senhaConfirmar} placeholder='Digite a senha novamente:' id='senha-confirmar' name='senha-confirmar' type='password' hidden={false} onChange={(e)=>{onChangeSenhaConfirmar(e)}} onEnter={()=>{}}/>
                    </Field>
                    <Field>
                        <Button label='Alterar senha' type='button' hidden={false} onClick={onClickAlterarSenha}/>
                    </Field>
                </form>
            </Box>
            <Alert label={alert.label} hidden={alert.hidden} type={alert.type}/>
            <Loader hidden={loader}/>
        </Container>
    )
}