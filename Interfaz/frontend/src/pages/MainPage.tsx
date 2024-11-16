import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import {useNavigate} from 'react-router-dom';
import Button from '../components/Button';

const MainPage = () => {
  const navigate = useNavigate();



  return (
    <div className="text-white bg-zinc-900 flex flex-col items-center justify-center m-auto h-screen max-w-[800px]">
        <h1 className='text-5xl p-5'>Navegador Wikipedia</h1>
        <Button className="text-2xl p-2" onClick={() => {navigate("/search-words")}}>Buscar por Palabras</Button>
        <Button className="text-2xl p-2" onClick={()=>{navigate("/search-pages")}}>Buscar páginas</Button>

    </div>
  );
};

export default MainPage;
