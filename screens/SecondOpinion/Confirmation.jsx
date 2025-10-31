import { useNavigation, useRoute } from "@react-navigation/native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { useSecondOpinion } from "../../context/SecondOpinionContext";
import Card from "../../components/Card";
import { CalendarDaysIcon, CheckCircleIcon } from "react-native-heroicons/outline";
import { useTheme } from "../../theme/ThemeProvider";

export default function Confirmation() {
    const route = useRoute();
    const { theme } = useTheme();
    const { soRequest } = route.params || {};
    const [so, setSo] = useState();
    const { secondOpinion, resetSecondOpinion } = useSecondOpinion();
    const navigation = useNavigation();
    useEffect(() => {
        setSo(secondOpinion);
        const timer = setTimeout(() => {
            resetSecondOpinion();
        }, 300); // wait a bit after navigation
        return () => clearTimeout(timer);
    })
    return (
        <SafeAreaContainer>

            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%" }}>
                <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                    <CheckCircleIcon color={theme.success} size={60} />

                </View>

                <Text style={{ fontFamily: theme.font700, fontSize: 24, marginBottom: 20 }}>Opinion Requested</Text>
                <Text style={{ fontFamily: theme.font500, fontSize: 16, textAlign: "center", marginBottom: 20 }}>Thanks for submitting your treatment plan for a second opinion.
                    Our team is reviewing the information. You’ll be notified once your review is complete. </Text>


                {/* <Card  >
                    
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


                </Card> */}

                <TouchableOpacity style={{ backgroundColor: theme.success, width: "100%", alignContent: "center", alignItems: "center", paddingVertical: 20 }} onPress={() => {
                    resetSecondOpinion();
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Home" }],
                    })
                }} >
                    <Text style={{ color: theme.white, fontFamily: theme.font700, fontSize: 16 }}>Back To Home</Text>
                </TouchableOpacity>
            </View>

            {/* <Text>{JSON.stringify(soRequest)}</Text> */}
        </SafeAreaContainer>
    )
}