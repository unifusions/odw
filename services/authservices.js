import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../config";
import { Alert } from "react-native";


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

export const loginUser = async (email, phone) => {
    try {
        const response = await api.post(`${BASE_URL}/register`, { email, phone });

        return response.data;
    } catch (error) {
        console.log(error)
        Alert.alert("Error", data.error);
    }
}
export const registerUser = async (email, phone) => {
    try {
        const response = await api.post(`${BASE_URL}/register`, { email, phone });
        
        // if (response.status === 200) {  // Check if request was successful
            // Alert.alert("Success", response.data.message);
            return response; 
        // }
        // return response.data;
    } catch (error) {
        return error.response
        // if (error.response) {
        //     // Handle server errors
        //     Alert.alert("Error", error.response.data.error || "Something went wrong!");
        // } else {
        //     // Handle network errors
        //     Alert.alert("Error", "Network error. Please try again.");
        // }
        // return null;
    }
};

// export const getUser = async() => {
//     const token = await AsyncStorage.getItem('authToken');

// }
