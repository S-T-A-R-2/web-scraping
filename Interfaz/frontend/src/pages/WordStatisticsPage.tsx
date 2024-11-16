import React, { useState } from 'react';
import {set, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { getWordTotalCount,getWordContTag_page, getWordTag_page } from '../api/auth';


const WordStatisticsPage = () => {

  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);
  const [countPage, setCountPage] = useState<any>([]);
  const [tagWord, setTagWord] = useState<any>([]);
  const [tagContWord, setTagContWord] = useState<any>([]);
  const { register, handleSubmit, formState: {
    errors,
} } = useForm<FormData>();

  type FormData = {
    text: string;
  }

  const handleSearch = handleSubmit( async (data: FormData) => {
    try {
      
      const response = await getWordTotalCount(data);
      setCount(response.data.total_count);
      
      const response2 = await getWordContTag_page(data);
      setTagContWord(response2.data);

      const response3 = await getWordTag_page(data);
      setTagWord(response3.data);

    } catch (err: any) {
      console.log(err.message)
    }
  });

  return (
    <div className="text-white bg-zinc-900 m-auto h-screen max-w-[1500px]">
      <h1 className='text-5xl p-5'>Estadísticas de palabra</h1>
      <p>Se va a tomar la primera palabra para estadísticas de una sola palabra</p>
      <p>Para palabras contiguas se van a tomar las primeras dos</p>

      <form onSubmit={handleSearch}>
        <div className='flex p-5'>
          <Input placeholder='Buscar palabras...' {...register("text", {required: true})}/>
          <Button type="submit" className="inline"> Search </Button>
        </div>
      </form>

      <p className='m-2'>Conteo total de la palabra: {count}</p>
      <div className='flex text-lg p-4 w-full justify-center'>
        <div className='m-2'>
          <p className='p-2'>Conteo de la palabra en tags por página:</p>
          {tagWord &&( 
            <div className="overflow-y-auto p-5">
              <ul role="list">
              {tagWord.map((link: Array<any>, index: number) => (
                <li key={index} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md mb-4">
                    {link[0] &&
                    <div className="max-h-40 overflow-y-auto">
                    <ul role="list">
                      {link.map((word: any, index2: any) =>(
                      <li key={index2} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">Tag: {word.tag}</h2>
                        <p className="text-gray-700"><b>Cantidad: </b> {word.count}</p>
                        <p className="text-gray-700"><b>Url:</b> {word.page_url}</p>
                      </li>
                      
                    ))}</ul></div>}
                </li>
              ))}
              </ul>
            </div>
          )}
        </div>
        <div className='m-2 '>
        <p className='p-2'>Conteo de <b>palabras contiguas</b> en tags por página:</p>
        {tagContWord &&( 
            <div className="overflow-y-auto p-5">
              <ul role="list">
              {tagContWord.map((link: Array<any>, index: number) => (
                <li key={index} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md mb-4">
                    {link[0] &&
                    <div className="max-h-40 overflow-y-auto">
                    <ul role="list">
                      {link.map((word: any, index2: any) =>(
                      <li key={index2} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">Tag: {word.tag}</h2>
                        <p className="text-gray-700"><b>Cantidad:</b> {word.count}</p>
                        <p className="text-gray-700"><b>Url:</b> {word.page_url}</p>
                      </li>
                      
                    ))}</ul></div>}
                </li>
              ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <Button className="text-2xl" onClick={() => {navigate("/")}}>Volver a inicio</Button>
    </div>
  );
};

export default WordStatisticsPage;
