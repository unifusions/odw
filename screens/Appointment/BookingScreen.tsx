import { useContext } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import ScreenHeader from "../../components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import ScrollableDatePicker from "../../components/ScrollableDatePicker";
import TimeSlotPicker from "../../components/TimeSlotPicker";

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

                    RightIcon={CalendarDaysIcon}
                />
                <View style={[gStyles.container, gStyles.flexJustifyBetween]}>
                    <View>
                        <Image source={{ uri: "https://placehold.co/100x100" }} style={gStyles.bookingAvatar} />
                        <Text style={[gStyles.dentistName]}>
                            Dr. Satya Joshi
                        </Text>
                        <Text style={[gStyles.textCenter, gStyles.textGrey, gStyles.textFont]}>
                            Clinic Name
                        </Text>
                        <ScrollableDatePicker />
                        <TimeSlotPicker />
                        <View> 
                            <Text>
                                Available Time Slot
                            </Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={gStyles.cta} onPress={() => navigation.navigate("Home")}>
                            <Text style={gStyles.buttonText}>Confirm Appointment</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}