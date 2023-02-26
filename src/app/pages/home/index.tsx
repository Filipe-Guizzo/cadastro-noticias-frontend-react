import { useEffect, useState } from 'react';
import Card from '../../components/card';
import Container from '../../components/container';
import Header from '../../components/header';
import Loader from '../../components/loader';
import { NoticiaProps } from '../../interfaces/noticia';
import { noticiaService } from '../../services/noticia/noticia-service';
import { buscaContext } from '../../contexts/buscar-context';

export default function Home(){
    const [noticias, setNoticias] = useState<NoticiaProps[]>([]); 
    const [busca, setBusca] = useState('')  
    const [loader, setLoader] = useState('hide');
    const setBuscar = (busca:string)=>{
        setBusca(busca);
    }
    useEffect(()=>{
        const listarNoticias = async ()=>{
            setLoader('show');
            const data = await noticiaService.listar();
            setNoticias(data);
            setLoader('hide');
        }
        listarNoticias(); 
    },[])

    useEffect(()=>{
        const listarNoticias = async ()=>{
            setLoader('show');
            const data = await noticiaService.buscar(busca);
            setNoticias(data);
            setLoader('hide');
        }
        if(busca !== ''){
            listarNoticias(); 
        }
    }, [busca])
    return(
        <>
            <buscaContext.Provider value={{termo:busca,setBuscar:setBuscar}}>
                <Header buscaInput={true}/>
                <Container>
                    {noticias.length > 0?
                        noticias.map((card) =>{
                            return <Card key={card.id!} id={card.id!} titulo={card.titulo} conteudo={card.conteudo} imagem={card.imagem!} pessoa={card.pessoa?.nome!} categoria={card.categoria?.nome!} />
                        })
                        :
                        <h1>Nenhuma noticia cadastrada</h1>
                    }
                    <Loader hidden={loader}/>
                </Container>
            </buscaContext.Provider>
        </>
    )
}