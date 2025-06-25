import axios from 'axios';

const APP_URL = "https://odw-demo.unifusions.com";
// const APP_URL = "http://127.0.0.1:8000";
const API_URL = APP_URL + "/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export default api;
