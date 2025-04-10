import api from "./api";

export const ClinicLocationServices = async () => {
    try {
        const response = await api.get('/clinics');
       
       console.log('clinics api');
        return response.data;
        
    }
    catch (error) {
        console.error('Error fetching ', error)
        throw error;
    }
}