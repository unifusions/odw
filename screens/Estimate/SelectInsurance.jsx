import { Text, View } from "react-native";
import LoadingDots from "../../components/LoadingDots";
import useInsurance from "../../hooks/useInsurance";
import { useAuth } from "../../context/AuthContext";

export default function SelectInsurance() {

    const { user } = useAuth();
    const { insurances, loading, errors } = useInsurance({ patientId: user.patient.id });
    return (
        <View>
            <LoadingDots />
            <Text>
                Select Insurances

            </Text>
        </View>
    )
}