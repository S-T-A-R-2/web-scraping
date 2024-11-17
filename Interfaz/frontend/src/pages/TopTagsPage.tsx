import React, { useState } from 'react';
import { getTopTagsWithMostDistinctWords, getTopTagsWithMostText, findPageByUrl } from '../api/auth';
import Button from '../components/Button';
import Input from '../components/Input';
import {useNavigate} from 'react-router-dom';


const TopTagsPage: React.FC = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState<string>('');
    const [pageId, setPageId] = useState<number | null>(null);
    const [distinctWordsTags, setDistinctWordsTags] = useState([]);
    const [textCountTags, setTextCountTags] = useState([]);
    const [error, setError] = useState<string>('');

    const handleSearch = async () => {
        try {
            let currentPageId = pageId;

            const response = await findPageByUrl(input);
            currentPageId = response.data.id;
            setPageId(currentPageId);


            if (!currentPageId) {
                setError('No se pudo encontrar la página. Verifica el URL ingresado.');
                return;
            }

            // Obtener los resultados de Top Tags para ambas métricas
            const [distinctWordsResponse, textCountResponse] = await Promise.all([
                getTopTagsWithMostDistinctWords(currentPageId),
                getTopTagsWithMostText(currentPageId),
            ]);

            console.log(distinctWordsResponse.data);
            console.log(textCountResponse.data);

            setDistinctWordsTags(distinctWordsResponse.data);
            setTextCountTags(textCountResponse.data);
            setError('');
        } catch (err) {
            setError('No se pudo obtener los resultados. Verifica el URL intenta de nuevo.');
        }
    };

    return (
        <div className="text-white bg-zinc-900 m-auto h-screen max-w-[800px]">
            <h1 className="text-5xl p-5">Top Tags</h1>

            
            <div className="flex p-5">
                <Input
                    placeholder="Ingresa URL de la página..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={handleSearch}>Buscar y Mostrar Top Tags</Button>
            </div>

            
            {error && <p className="text-red-500">{error}</p>}

            <div className="p-5">
                <h2 className="text-3xl">Top Tags con Más Palabras Distintas</h2>
                <ul>
                    {distinctWordsTags.map((tag: any, index: number) => (
                        <li key={index}>
                            {tag.tag}: {tag.distinct_words_count} palabras distintas
                        </li>
                    ))}
                </ul>
            </div>

            {/* Resultados: Top Tags con Más Texto */}
            <div className="p-5">
                <h2 className="text-3xl">Top Tags con Más Texto</h2>
                <ul>
                    {textCountTags.map((tag: any, index: number) => (
                        <li key={index}>
                            {tag.tag}: {tag.total_word_count} palabras
                        </li>
                    ))}
                </ul>
            </div>
            <Button className="text-2xl" onClick={() => {navigate("/")}}>Volver a inicio</Button>
        </div>
    );
};

export default TopTagsPage;
