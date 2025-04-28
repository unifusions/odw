import { Alert } from "react-native";
import api from "./api";

export const bookAppointment = async (patient_id, clinic_id, appointment_date, clinic_branch_id, time_slot, service_id) => {
    try {
        const response = await api.post('/book-appointment', {
            patient_id,
            clinic_id,
            appointment_date,
            clinic_branch_id,
            time_slot,
            service_id
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