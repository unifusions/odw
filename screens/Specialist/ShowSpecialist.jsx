import { ScrollView  } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { useNavigation, useRoute } from "@react-navigation/native";
import DentistProfile from "../../components/DentistProfile";
import BottomButton from "../../components/BottomButton";
import BookSpecialistOverlay from "./BookSpecialistOverlay";
import { useState } from "react";

export default function ShowSpecialist() {

    const navigation = useNavigation();
    const route = useRoute();
    const { specialist } = route.params;

    const [overlay, setOverlay] = useState(false);
    return (
        <SafeAreaContainer allowedBack={true} screenTitle={specialist?.name}>
            <ScrollView style={{ flex: 1 }}>

                <DentistProfile dentist={specialist} />

              
            </ScrollView>
        <BookSpecialistOverlay
            visibility={overlay}
            requestClose={()=>setOverlay(false)}
            specialist={specialist}
        />
            <BottomButton
                handlepress={() => {
                    navigation.navigate("BookSpecialist", {
                        specialist: specialist
                    })
                }}

                // handlepress={() => setOverlay(true)}
                value="Book Specialist"
            />

        </SafeAreaContainer>
    )
}