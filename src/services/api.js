import axios from "axios";

/// Base da URL: https://api.themoviedb.org/3
/// URL da API: /movie/now_playing?api_key=d52f992e0585d97f43552403f7e2dbe8&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;