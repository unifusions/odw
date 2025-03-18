import axios from "axios";
import { BASE_URL } from "../config";

const API_URL = BASE_URL + "/api"

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getDentalServices = async () => {
    try {
        const response = await api.get('/dental-services');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching ', error)
        throw error;
    }
}