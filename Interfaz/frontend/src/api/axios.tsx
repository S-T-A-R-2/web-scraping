import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://ds-proyecto.onrender.com/api',
    withCredentials: true
});

export default instance;
