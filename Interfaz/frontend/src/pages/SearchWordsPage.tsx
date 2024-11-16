import React, { useEffect, useState } from 'react';
import {set, useForm} from 'react-hook-form';
import Button from '../components/Button';
import Input from '../components/Input';
import {useNavigate} from 'react-router-dom';
import {searchByWords} from '../api/auth';

const SearchWordsPage = () => {

  const navigate = useNavigate();
  const [links, setLinks] = useState<any>([]);
  const { register, handleSubmit, formState: {
    errors,
} } = useForm<FormData>();

  type FormData = {
    text: string;
  }

  const handleSearch = handleSubmit( async (data: FormData) => {
    try {
      


      const response = await searchByWords(data);
      setLinks(response.data);
      console.log(links);
    } catch (err: any) {
      console.log(err.message)
    }
  });

  return (
    <div className="text-white bg-zinc-900 m-auto h-screen max-w-[800px]">
      <h1 className='text-5xl p-5'>Buscar por palabras</h1>
      <form onSubmit={handleSearch}>
        <div className='flex p-5'>
          <Input placeholder='Buscar palabras...' {...register("text", {required: true})}/>
          <Button type="submit" className="inline"> Search </Button>
        </div>
      </form>
      {links &&( 
        <div className="overflow-y-auto p-5">
          <ul role="list">
          {links.map((link: Array<any>, index: number) => (
            <li key={index} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md mb-4">
                {link[0] &&
                <div className="max-h-40 overflow-y-auto">
                <ul role="list">
                  {link.map((word: any, index2: any) =>(
                  <li key={index2} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">{word.word}</h2>
                    <p className="text-gray-700">{word.url}</p>
                  </li>
                  
                ))}</ul></div>}
            </li>
          ))}
          </ul>
        </div>
      )}

      <Button className="text-2xl" onClick={() => {navigate("/")}}>Volver a inicio</Button>
    </div>
  );
};

export default SearchWordsPage;
