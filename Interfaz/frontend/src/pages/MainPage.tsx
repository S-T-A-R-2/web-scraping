import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import {useNavigate} from 'react-router-dom';
import Button from '../components/Button';

const MainPage = () => {
  const navigate = useNavigate();



  return (
    <div className="text-white bg-zinc-900 flex flex-col items-center justify-center m-auto h-screen max-w-[800px]">
        <h1 className='text-5xl p-5'>Navegador Wikipedia</h1>
        <Button className="text-2xl p-2 m-2 " onClick={() => {navigate("/search-words")}}>Buscar por Palabras</Button>
        <Button className="text-2xl p-2 m-2" onClick={()=>{navigate("/word-statistics")}}>Buscar estadísticas de palabras</Button>
        <Button className="text-2xl p-2 m-2" onClick={()=>{navigate("/search-percentage")}}>Buscar porcentajes de palabras</Button>
        <Button className="text-2xl p-2 m-2" onClick={()=>{navigate("/top-tags")}}>Buscar estadísticas de tags</Button>

    </div>
  );
};

export default MainPage;
