import { Text, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import SafeAreaContainerStepForm from "../../components/SafeAreaContainerStepForm";
import { useRoute } from "@react-navigation/native";
import TimeSelect from "../Appointment/TimeSelect";

export default function ClinicAppointment() {

    const route = useRoute();
    const { clinic } = route.params;
    return (
        <>
           <SafeAreaContainerStepForm screenTitle="Appointment"  allowedBack={true}>
                {console.log(clinic)}

                {/* <TimeSelect /> */}
           </SafeAreaContainerStepForm>
        </>
    )
}