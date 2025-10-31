
import { Alert } from "react-native";
import api from './api';

// const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     },

// });


export const verifyOtp = async (email, phone, otp) => {
    try {
        const response = await api.post('verify-otp', { email, phone, otp });

        return response.data.token;
    } catch (error) {

        return error.response.data;
    }
};

export const loginUser = async (email) => {
    try {

        const response = await api.post('/login', { params: { email: email } });
        return response;
    } catch (error) {

        Alert.alert("Error", data.error);
    }
}
export const registerUser = async (email, phone, fullname) => {
    try {


        const response = await api.post('/register', {

            email: email,
            phone: phone,
            fullname: fullname

        });


        return response;

    } catch (error) {

        console.log(error);
        return error.response

    }
};

// export const getUser = async() => {
//     const token = await AsyncStorage.getItem('authToken');

// }
