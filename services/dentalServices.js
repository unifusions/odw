import api from "./api";

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

export const getAllDentalServices = async () => {
    try {
        const response = await api.get('/all-dental-services');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching ', error)
        throw error;
    }
}