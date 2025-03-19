import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import ScreenHeader from "../../components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";

export default function BookingScreen() {

    const { theme } = useContext(ThemeContext);
    const gStyles = getGlobalStyles(theme);
    const navigation = useNavigation();
    return (
        <SafeAreaProvider >
            <SafeAreaView style={[gStyles.safeAreaContainer]}>
                <ScreenHeader
                    title="New Appointment"
                    onBackPress={() => navigation.goBack()}


                />
                <View style={[gStyles.container, gStyles.flexJustifyBetween]}>
                    <View>
                        <Text>Booking Screen</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={gStyles.cta} onPress={() => navigation.navigate("AuthOtp")}>
                            <Text style={gStyles.buttonText}>Confirm Appointment</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}