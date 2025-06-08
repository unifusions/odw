import api from "./api";
import { Alert } from "react-native";


export const getInsurance = async () => {

    try {

        const response = await api.get('/insurance', { params: { patient_id: '1' } });
        return response.data;
    }
    catch (error) {
        Alert.alert("Error", error);
    }
}