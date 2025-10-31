import api from "./api";

export const getDentalCare = async () => {
    try {
        const response = await api.get('/dentalcare');

        return response.data;
    }
    catch (error) {
        console.error('Error fetching ', error)
        throw error;
    }
}

export const getDentalCareByTreatment = async (dental_service_id) => {
    
    try {
       
        const response = await api.get('/categories/services', { params: {
            dental_service_id: dental_service_id
        } });
        
        return response.data ;

    }
    catch (error) {
        console.error('Error');
        throw error;
    }
}