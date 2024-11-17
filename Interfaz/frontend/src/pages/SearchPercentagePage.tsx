import React, { useState, useEffect } from 'react';
import { findPageByUrl, getWordPercentageInPage } from '../api/auth';
import Button from '../components/Button';
import Input from '../components/Input';
import {useNavigate} from 'react-router-dom';

const WordPercentagePage: React.FC = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState<string>('');
    const [pageId, setPageId] = useState<number | null>(null);
    const [percentageResults, setPercentageResults] = useState([]);
    const [error, setError] = useState<string>('');

    const handleFindPageId = async () => {
        try {
            
            const response = await findPageByUrl(input);
            setPageId(response.data.id);
            setError('');
        } catch (err) {
            setError('No se pudo encontrar la página con el URL proporcionado.');
        }
    };

    useEffect(() => {
        const fetchWordPercentage = async () => {
            if (!pageId) return;

            try {
                const response = await getWordPercentageInPage(pageId);
                setPercentageResults(response.data);
                setError('');
            } catch (err) {
                setError('No se pudo obtener el porcentaje de palabras en la página.');
            }
        };

        fetchWordPercentage();
    }, [pageId]);

    return (
        <div className="text-white bg-zinc-900 m-auto h-screen max-w-[800px] overflow-y-auto">
            <h1 className="text-5xl p-5">Porcentaje de Palabra en Página</h1>

            <div className="flex p-5">
                <Input
                    placeholder="Ingresa URL de la página..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={handleFindPageId}>Buscar</Button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="p-5 max-h-[500px] overflow-y-auto">
                <h2 className="text-3xl">Resultados</h2>
                <ul>
                    {percentageResults.map((result: any, index: number) => (
                        <li key={index} className="p-1">
                            <strong>{result.palabra}</strong>: forma el {result.porcentaje}%
                        </li>
                    ))}
                </ul>
            </div>
            <Button className="text-2xl" onClick={() => {navigate("/")}}>Volver a inicio</Button>

        </div>
    );
};

export default WordPercentagePage;
