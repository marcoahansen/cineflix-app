import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home';
import Filme from './pages/Filme';
import Header from './components/Header';
import Favoritos from './pages/Favoritos';

import Erro from './pages/Erro';



function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={ <Home/> }/>
                <Route path='/filme/:id' element={ <Filme/> }/>
                <Route path='/favoritos' element={ <Favoritos/> }/>
                
                
                <Route path='/404' element={ <Erro/> }/>
                <Route path='*' element={<Navigate to='/404'/>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default RoutesApp;