import axios from 'axios';

const APP_URL = "https://odwapp.ai";
// const APP_URL = "http://192.168.20.1:8000";
// const APP_URL = "http://127.0.0.1:8000";
const API_URL = APP_URL + "/api";

const api = axios.create({
    baseURL: API_URL,
    headers : {'Content-Type' : 'application/json'},
    timeout: 50000, 
});

export default api;
