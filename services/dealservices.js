import api from "./api";

export const getDeals = async () => {
    try {
        const response = await api.get('/deals');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching ', error)
        throw error;
    }
}