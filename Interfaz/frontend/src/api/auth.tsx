import axios from './axios';

type UserData = {
    username: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    rol: string;
};

type SearchByWordData = {
    text: string;
}

//No se como quitar eso sin que se rompa
export const registerRequest = (userData : UserData) => {return axios.post(`/register`, userData);};
export const loginRequest = (userData : {username : string, password : string}) => 
    axios.post(`/login`, userData);
export const verifyTokenRequest = () => axios.get(`/verify`);

// Cosos reales de la aplicacion de verdad de veritas pinky promise
export const searchByWords = (input: SearchByWordData) => axios.get('/searchByWord', {
    params: {input}
});

export const getWordTotalCount = (input: any) => axios.get('/get-word-total-count', {
    params: {input}
});

export const getWordContTag_page = (input: any) => axios.get('/get-wordContTag', {
    params: {input}
});

export const getWordTag_page = (input: any) => axios.get('/get-wordTag', {
    params: {input}
});

export const getWordPercentageInPage = (input: any) => axios.get('/word-percentage', {
    params: {input}
});

export const getTopTagsWithMostDistinctWords = (input: any) => axios.get('/top-tags-distinct-words', {
    params: {input}
});

export const getTopTagsWithMostText = (input: any) => axios.get('/top-tags-text-count', {
    params: {input}
});

export const findPageByUrl = (input: any) => axios.get('/find-page-by-url', {
    params: {input}
});