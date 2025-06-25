import { Text, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";

export default function BookEmergency() {
    return (
        <>
            <SafeAreaContainer
                screenTitle="Book An Emergency"
                allowedBack={true}
            >
                <View>
                    <Text>
                        Emergency dental appointments may have an emergency fee which is not covered by most
                        dental insurance
                    </Text>
                </View>
            </SafeAreaContainer>
        </>
    )
}