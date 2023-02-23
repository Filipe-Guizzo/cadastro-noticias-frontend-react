import Button from '../../components/button';
import Input from '../../components/input';
import styles from './styles.module.css';
import { useState } from 'react';
import Alert from '../../components/alert';
import Loader from '../../components/loader';
import { pessoaService } from '../../services/pessoa/pessoa-service';

export default function EsqueceuSenha(){
    const [email, setEmail] = useState({value:'', hidden:false});
    const [codigo, setCodigo] = useState({value:0, hidden:true});
    const [codigoEnviado, setCodigoEnviado] = useState(0);
    const [idPessoa, setIdPessoa] = useState(0);
    const [alert, setAlert] = useState({hidden: 'hide',label: '',type: 'danger'});
    const [loader, setLoader] = useState('hide');
    const [enviarCodigo, setEnviarCodigo] = useState(false);
    const [compararCodigo, setCompararCodigo] = useState(true);

    function onChangeEmail(e:any){
        const value = e.target.value;
        setEmail({value:value, hidden:email.hidden});
    }

    function onChangeCodigo(e:any){
        const value = e.target.value;
        setCodigo({value:value, hidden:codigo.hidden});
    }

    async function onClickEnviarCodigo(){
        setLoader('show');
        const recuperarSenha = {
            email: email.value
        }
        if(recuperarSenha.email == ''){
            setAlert({hidden: 'show',label: 'Preencha todos os campos',type: 'danger'});
        }else{
            const data = await pessoaService.recuperarSenha(recuperarSenha);

            if(data?.codigo){
                setAlert({hidden: 'show',label: 'Codigo enviado',type: 'success'});
                setEmail({value:email.value, hidden:true});
                setEnviarCodigo(true);
                setCodigo({value:codigo.value, hidden:false});
                setCompararCodigo(false);
                setCodigoEnviado(data?.codigo);
                setIdPessoa(data?.id_pessoa!);
            }else{
                setAlert({hidden: 'show',label: data?.message!,type: 'danger'});
            }
        }
        setLoader('hide')
    }

    async function onClickCompararCodigo(){
        setLoader('show');
        if(codigo.value == 0){
            setAlert({hidden: 'show',label: 'Preencha todos os campos',type: 'danger'});
        }else{
            if(codigo.value != codigoEnviado){
                setAlert({hidden: 'show',label: 'Codigos diferentes',type: 'danger'});
            }else{
                setAlert({hidden: 'show',label: 'Codigo validado com sucesso',type: 'success'});
            }
        }
        setLoader('hide')
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
                        <label htmlFor="email" hidden={email.hidden}>E-mail:</label>
                        <Input value={email.value} placeholder='Digite seu e-mail' id='email' name='email' type='email' hidden={email.hidden} onChange={(e)=>{onChangeEmail(e)}}/>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="codigo" hidden={codigo.hidden}>Codigo:</label>
                        <Input value={codigo.value} placeholder='Digite o codigo enviado:' id='codigo' name='codigo' type='number' hidden={codigo.hidden} onChange={(e)=>{onChangeCodigo(e)}}/>
                    </div>
                    <div className={styles.field}>
                        <Button label='Enviar codigo' type='button' hidden={enviarCodigo} onClick={onClickEnviarCodigo}/>
                        <Button label='Comparar codigo' type='button' hidden={compararCodigo} onClick={onClickCompararCodigo}/>
                    </div>
                </form>
            </div>
            <Alert label={alert.label} hidden={alert.hidden} type={alert.type}/>
            <Loader hidden={loader}/>
        </div>
    )
}