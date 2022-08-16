import { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

import './filme-info.css'


import api from '../../services/api'

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "d52f992e0585d97f43552403f7e2dbe8",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{
                console.log('filme não encontrado')
                navigate('/',{ replace: true })
                return;
            })
        }
        loadFilme();

        return () => {
            console.log('componente foi desmontado')
        }
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@cineflix')

        let filmesSalvos =JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
            toast.error('Esse filme já está na lista =(')
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@cineflix', JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso!')


    }

    if(loading){
        return(
            <div className='filme-info'>
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title}`}>Trailer</a>
                </button>

            </div>

        </div>
    )
}

export default Filme;