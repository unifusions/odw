import api from "./api";

export const getDentalCare = async () => {
    try {
        const response = await api.get('/dentalcare');
        console.log(api.get('/dentalcare'));
        return response.data;
    }
    catch (error) {
        console.error('Error fetching ', error)
        throw error;
    }
}