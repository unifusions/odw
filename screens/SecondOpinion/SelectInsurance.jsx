import { Text } from "react-native";
import SecondOpinionWrapper from "./SecondOpinionWrapper";
import { useAuth } from "../../context/AuthContext";
import useInsurance from "../../hooks/useInsurance";

export default function SelectInsurance() {

    const {user} = useAuth();
    const {insurances, loading,errors} = useInsurance({patientId: user.patient.id});
    return (
        <SecondOpinionWrapper screenTitle="Select Insurance" loading={loading}>
            <Text>{JSON.stringify(insurances)}</Text>
        </SecondOpinionWrapper>
    )
}