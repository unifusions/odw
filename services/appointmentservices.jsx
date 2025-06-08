import { Alert } from "react-native";
import api from "./api";

export const bookAppointment = async (patient_id, clinic_id, appointment_date, clinic_branch_id, time_slot, clinic_dentist_id, service_id) => {
    try {
        const response = await api.post('/book-appointment', {
            patient_id,
            clinic_id,
            appointment_date,
            clinic_branch_id,
            time_slot,
            service_id,
            clinic_dentist_id
        });
        return response;
    } catch (error) {
        if (error.response && error.response.status === 422) {
            Alert.alert("Slot Not Available", "Please choose another slot.");
            return { status: 422 };
        }

        console.error("Unknown error in booking:", error);

        Alert.alert("Unknown Error", error.message || "Something went wrong");
        return { status: "error", error };
    }
}

export const myAppointments = async ({patient_id}) => {
    try {
        const response = await api.get('/my-appointments', {params:{
            patient_id: patient_id
        }  });
        return response.data;

    }
    catch (error) {
        if (error.response && error.response.status === 422) {
            Alert.alert("Something went wrong. Please try again later");
            return { status: 422 };
        }

        Alert.alert("Unknown Error", error.message || "Something went wrong");
        return { status: "error", error };
    }
}