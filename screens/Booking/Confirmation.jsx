import { Text, TouchableOpacity, View } from "react-native";

// import { CheckCircleFill } from "react-bootstrap-icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
import { CalendarDaysIcon, CheckCircleIcon } from "react-native-heroicons/solid";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import Card from "../../components/Card";
import { MapPinIcon } from "react-native-heroicons/outline";
import { useBooking } from "../../context/BookingContext";

export default function Confirmation() {
    const { theme } = useContext(ThemeContext);
    const route = useRoute();
    const navigation = useNavigation();
    const { booking, resetBooking, error } = useBooking();
    // booking data comes from route params
    const { bookingRequest } = route.params || {};
    const [originalBooking, setOriginalBooking] = useState();
    useEffect(() => {
        setOriginalBooking(booking)
        // // Delay the reset so Summary is fully gone
        const timer = setTimeout(() => {
            resetBooking();
        }, 300); // wait a bit after navigation
        return () => clearTimeout(timer);
    }, []);
    return (
        <SafeAreaContainer>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%" }}>
                <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                    <CheckCircleIcon color={theme.success} size={60} />

                </View>

                <Text style={{ fontFamily: theme.font700, fontSize: 24 }}>Appointment Requested</Text>
                <Text style={{ fontFamily: theme.font500, fontSize: 16, textAlign: "center", marginBottom: 20 }}>Thanks  for booking your dental appointment with One Dental World. Your request has been received and is being processed.</Text>

              
                <Card  >
                    {/* <Text>{JSON.stringify(bookingRequest)}</Text> */}
                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginVertical: 20 }}>
                        <CalendarDaysIcon color={theme.blue} size={30} style={{ marginEnd: 20 }} />
                        <View>
                            <Text style={{ fontSize: 16, fontFamily: theme.font600 }}>{originalBooking?.time?.selectedDate?.fullDate}</Text>
                            <Text style={{ fontSize: 16, fontFamily: theme.font600 }}>{originalBooking?.time?.selectedSlot}</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginBottom: 10 }}>
                        <MapPinIcon color={theme.blue} size={30} style={{ marginEnd: 20 }} />
                        <View>
                            <Text style={{ fontSize: 16, fontFamily: theme.font600 }}>{originalBooking?.clinic?.name}</Text>
                            <Text style={{ fontSize: 14, fontFamily: theme.font400 }}>{originalBooking?.clinic?.address_line_1}</Text>
                            <Text style={{ fontSize: 14, fontFamily: theme.font400 }}>{originalBooking?.clinic?.address_line_2}</Text>
                            {originalBooking?.clinic?.address_line_3 && <Text style={{ fontSize: 14, fontFamily: theme.font400 }}>{originalBooking?.clinic?.address_line_3}</Text>}
                            <Text style={{ fontSize: 14, fontFamily: theme.font400 }}>{originalBooking?.clinic?.city} - {originalBooking?.clinic?.zip_code}</Text>
                        </View>
                    </View>


                </Card>

                <TouchableOpacity style={{ backgroundColor: theme.success, width: "100%", alignContent: "center", alignItems: "center", paddingVertical: 20 }} onPress={() => {
                    resetBooking();
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Home" }],
                    })
                }} >
                    <Text style={{ color: theme.white, fontFamily: theme.font700, fontSize: 16 }}>Back To Home</Text>
                </TouchableOpacity>
            </View>





        </SafeAreaContainer>


    )
}