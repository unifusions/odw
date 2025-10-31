import { ScrollView } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";

import { useNavigation, useRoute } from "@react-navigation/native";
import DentistProfile from "../../components/DentistProfile";
import BottomButton from "../../components/BottomButton";

export default function ShowDentist() {

    const navigation = useNavigation();
    const route = useRoute();
    const { dentist } = route.params;

    return (
        <SafeAreaContainer allowedBack={true} screenTitle={dentist?.name}>
            <ScrollView style={{ flex: 1 }}>
                <DentistProfile dentist={dentist} />
            </ScrollView>

            <BottomButton
                handlepress={() => {
                    navigation.navigate("DentistBooking", {
                        dentist: dentist
                    })
                }}
                value="Book Appointment"
            />

        </SafeAreaContainer>
    )
}