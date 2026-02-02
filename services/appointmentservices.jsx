import { Alert } from "react-native";
import api from "./api";

export const bookAppointment = async (patient_id, clinic_id, appointment_date, time_slot, 
    dental_service_id, appointable_id, appointable_type) => {


    try {
        const response = await api.post('/book-appointment', {
            patient_id,
            clinic_id,
            appointment_date,
            time_slot,
            dental_service_id,
            appointable_id,
            appointable_type
        });
        return response;
    } catch (error) {

        if (error.response && error.response.status === 422) {
            Alert.alert("Slot Not Available", "Please choose another slot.");
            return { status: 422 };
        }

        console.log("Unknown error in booking:", error);

        // Alert.alert("Unknown Error", error.message || "Something went wrong");
        return error;
    }
}

export const myAppointments = async ({ patient_id }) => {
    try {
        const response = await api.get('/my-appointments', {
            params: {
                patient_id: patient_id
            }
        });
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