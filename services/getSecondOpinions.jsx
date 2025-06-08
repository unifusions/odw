import api from "./api";

export const getSecondOpinions = async ({ patient_id }) => {
    try {
        const response = await api.get('/second-opinions', { 
            params: { patient_id: '1' }
         });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching ', error)
        throw error;
    }
}