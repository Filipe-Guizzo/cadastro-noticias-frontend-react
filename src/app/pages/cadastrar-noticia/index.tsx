import Button from '../../components/button';
import Input from '../../components/input';
import { useEffect, useState } from 'react';
import Alert from '../../components/alert';
import Loader from '../../components/loader';
import Header from '../../components/header';
import { CategoriaProps } from '../../interfaces/categoria';
import { categoriaService } from '../../services/categoria/categoria-service';
import Box from '../../components/box';
import Field from '../../components/field';
import Container from '../../components/container';
import SelectInput from '../../components/select-input';
import { noticiaService } from '../../services/noticia/noticia-service';
import FileInput from '../../components/file-input';

export default function CadastrarNoticia(){
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [categoria, setCategoria] = useState(-1);
    const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
    const [imagem, setImagem] = useState(null);

    const [alert, setAlert] = useState({hidden: 'hide',label: '',type: 'danger'});
    const [loader, setLoader] = useState('hide');

    useEffect (()=>{
        setLoader('show');
        const listaCategorias =  async () =>{
            const data =  await categoriaService.listar();
            setCategorias(data);
        } 
        listaCategorias();
        setLoader('hide');
    },[])

    function onChangeTitulo(e:any){
        const value = e.target.value;
        setTitulo(value);
    }

    function onChangeConteudo(e:any){
        const value = e.target.value;
        setConteudo(value);
    }

    function onChangeCategoria(e:any){
        const value = e.target.value;
        setCategoria(value);
    }

    function onChangeImagem(e:any){
        const value = e.target.files[0];
        setImagem(value);
    }

    async function onClickCadastrar(){
        setLoader('show');
        const noticia = {
            titulo: titulo,
            conteudo: conteudo,
            id_categoria:categoria,
            id_pessoa: 4
        }
        if( noticia.titulo === '' ||
            noticia.conteudo === '' ||
            noticia.id_categoria === -1 ||
            imagem === null){
            setAlert({hidden: 'show',label: 'Preencha todos os campos',type: 'danger'})
            setLoader('hide');
        }else{
            const data = await noticiaService.criar(noticia);
            if(data?.id){
                const form = new FormData();
                form.append("file", imagem);
                await noticiaService.uploadFile(data?.id!, form);
                setAlert({hidden: 'show',label: 'Noticia cadastrada com sucesso',type: 'success'})
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
                    <h1>Cadastro de Noticia</h1>
                    <br />
                    <br />
                    <form>
                        <Field>
                            <label htmlFor="titulo">Titulo:</label>
                            <Input value={titulo} placeholder='Digite o titulo da noticia' id='titulo' name='titulo' type='text' hidden={false} onChange={(e)=>{onChangeTitulo(e)}}/>
                        </Field>
                        <Field>
                            <label htmlFor="conteudo">Conteudo:</label>
                            <Input value={conteudo} placeholder='Digite o conteudo da noticia' id='conteudo' name='conteudo' type='text' hidden={false} onChange={(e)=>{onChangeConteudo(e)}}/>
                        </Field>
                        <Field>
                            <label htmlFor="categoria">Categoria:</label>
                            <SelectInput value={categoria} placeholder='Escolha uma categoria' id='categoria' name='categoria' onChange={(e)=>{onChangeCategoria(e)}}>
                                {
                                    categorias.map((categoria)=>{
                                    return <option value={categoria?.id} key={categoria.id}>{categoria.nome}</option>
                                    })
                                
                                }
                            </SelectInput>
                        </Field>
                        <Field>
                            <FileInput id='imagem' name='imagem' onChange={(e)=>{onChangeImagem(e)}}/>
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