import Button from '../../components/button';
import Input from '../../components/input';
import { useState } from 'react';
import Alert from '../../components/alert';
import Loader from '../../components/loader';
import Header from '../../components/header';
import { categoriaService } from '../../services/categoria/categoria-service';
import Box from '../../components/box';
import Field from '../../components/field';
import Container from '../../components/container';

export default function CadastrarCategoria(){
    const [nome, setNome] = useState('');

    const [alert, setAlert] = useState({hidden: 'hide',label: '',type: 'danger'});
    const [loader, setLoader] = useState('hide');

    function onChangeNome(e:any){
        const value = e.target.value;
        setNome(value);
    }

    async function onClickCadastrar(){
        setLoader('show');
        const categoria = {
            nome: nome,
        }
        if( categoria.nome === ''){
            setAlert({hidden: 'show',label: 'Preencha todos os campos',type: 'danger'})
            setLoader('hide');
        }else{
            const data = await categoriaService.criar(categoria);
            if(data?.id){
                setAlert({hidden: 'show',label: 'Categoria cadastrada com sucesso',type: 'success'})
                setLoader('hide');
            }else{
                setAlert({hidden: 'show',label: 'Erro interno',type: 'danger'})
                setLoader('hide');
            }
        }
    }

    return(
        <>
            <Header buscaInput={false}/>
            <Container>
                <Box>
                    <h1>Cadastro de Categoria</h1>
                    <br />
                    <br />
                    <form>
                        <Field>
                            <label htmlFor="nome">Nome:</label>
                            <Input value={nome} placeholder='Digite o nome' id='nome' name='nome' type='text' hidden={false} onChange={(e)=>{onChangeNome(e)}} onEnter={()=>{}}/>
                        </Field>
                        <Field>
                            <Button label='Cadastrar' type='button' hidden={false} onClick={onClickCadastrar}/>
                        </Field>
                    </form>
                </Box>
                <Alert label={alert.label} hidden={alert.hidden} type={alert.type}/>
                <Loader hidden={loader}/>
            </Container>
        </>
    )
}