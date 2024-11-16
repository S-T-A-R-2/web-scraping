import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import {useNavigate} from 'react-router-dom';

const SearchPagesPage = () => {

  const navigate = useNavigate();



  return (
    <div className="text-white bg-zinc-900 m-auto h-screen max-w-[800px]">
      <h1 className='text-5xl p-5'>Buscar por página</h1>
      <div className='flex p-5'>
				<Input placeholder='Buscar páginas...'/>
        <Button className="inline"> Search </Button>
      </div>




      <Button className="text-2xl" onClick={() => {navigate("/")}}>Volver a inicio</Button>
    </div>
  );
};

export default SearchPagesPage;
