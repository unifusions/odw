import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../config";


const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    
});


export const verifyOtp = async (email, phone, otp) => {
    try {
        const response = await axios.post(`${BASE_URL}/verify-otp`, { email, phone, otp });
    
        return response.data.token;
    } catch (error) {
        return error.response.data;
    }
};

export const registerUser = async (email, phone) => {
    try {
        const response = await api.post(`${BASE_URL}/register`, { email, phone });
       
        return response.data;
    } catch (error) {
        return error;
    }
};

// export const getUser = async() => {
//     const token = await AsyncStorage.getItem('authToken');

// }
