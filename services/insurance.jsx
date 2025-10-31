import { useContext } from "react";
import api from "./api";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";


export const getInsurance = async (patient) => {
 
    
    try {

       
        const response = await api.get('/insurance', { params: { patient_id: patient } });
        return response.data;
    }
    catch (error) {
        Alert.alert("Error", error);
    }
}