import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import Card from "../../components/Card";
import RowItem from "../../components/RowItem";
import { CalendarIcon, ClockIcon, ListBulletIcon } from "react-native-heroicons/outline";
import { useTheme } from "../../theme/ThemeProvider";
import BottomButton from "../../components/BottomButton";
import { useState } from "react";
import BottomSheetDialog from "../../components/BottomSheetDialog";
import api from "../../services/api";

export default function AppointmentScreen() {

    const route = useRoute();
    const { appointment } = route.params;
    const { theme } = useTheme();

    const [cancelVisible, setCancelVisible] = useState(false);
    const navigation = useNavigation();

    const cancelConfirm = async () => {
        try {
            const response = await api.post('/cancel-appointment', {
                appointment_id: appointment.appointment_id
            })

            return response;
        }
        catch (error) {
            return error;
        }
    }
    const handleCancel = () => {


        setCancelVisible(false);
        const response = cancelConfirm();
        if (response) {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "Inbox",
                        state: {
                            routes: [{ name: "MyInbox" }],
                        },
                    },
                ],
            });
        }
    }
    const styles = StyleSheet.create({
        providerName: {
            fontFamily: theme.font700,
            fontSize: 18
        },
        providerClinic: {
            fontFamily: theme.font500,
            fontSize: 16
        },
        specialistBadge: {

            backgroundColor: "#CFF4FC",
            fontFamily: theme.font500,
            paddingHorizontal: 10,
            paddingVertical: 3,

            borderRadius: 5,
            fontSize: 12,
            textTransform: "uppercase",
            borderColor: "#B7EFFA",
            borderWidth: 1,
            borderStyle: "solid",
            color: "#055160"
        },
        dentistBadge: {
            backgroundColor: "#cfe2ff",
            fontFamily: theme.font500,
            paddingHorizontal: 10,
            paddingVertical: 3,

            borderRadius: 5,
            fontSize: 12,
            textTransform: "uppercase",
            borderColor: "#9ec5fe",
            borderWidth: 1,
            borderStyle: "solid",
            color: "#052c65"
        }
    });
    return (
        <SafeAreaContainer
            allowedBack={true}
            screenTitle="Booking"

        >



            <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <Text
                    style={{
                        marginBottom: 12,
                        fontFamily: theme.font500
                    }}
                > Booking ID # {appointment?.appointment_id} </Text>

 
                <Card>

                    <View style={{
                        flexDirection: "row",
                        gap: 15,
                        alignItems: "center"
                    }} >

                        <Image source={{ uri: appointment?.provider?.data?.photo_url }}
                            style={{
                                height: 100, width: 100,
                                borderRadius: 100,

                            }}
                        />
                        <View style={{ flex: 1, flexShrink: 1 }}>
                            <View style={{
                                alignSelf: "flex-start",
                                borderRadius: 5,



                                marginBottom: 4,
                            }} >
                                <Text style={appointment?.provider?.type === "Specialist" ? styles.specialistBadge : styles.dentistBadge}>
                                    {appointment?.provider?.type}
                                </Text>
                            </View>
                            <Text style={styles.providerName}>
                                {appointment?.provider?.data?.name}
                            </Text>


                            <Text style={styles.providerClinic}>
                                {appointment?.clinic}

                            </Text>

                        </View>

                    </View>



                </Card>

                <Card>

                    <RowItem
                        icon={<CalendarIcon color={theme.blue} />}
                        title={appointment?.appointment_date}
                    />

                    <RowItem
                        icon={<ClockIcon color={theme.blue} />}
                        title={appointment?.appointment_time}
                    />


                </Card>
                {/* <Text>{JSON.stringify(appointment)}</Text>
                 */}





            </View>
            <BottomButton

                buttonTheme="danger"
                handlepress={() => {
                    setCancelVisible(true)
                }}

                // handlepress={() => setOverlay(true)}
                value="Cancel Appointment"
            />

            <BottomSheetDialog
                visible={cancelVisible}
                title="Cancel Appointment"
                message="Are you sure you want to cancel this appointment?"
                onConfirm={handleCancel}
                onCancel={() => setCancelVisible(false)}
                confirmText="Yes, Cancel"
            />
        </SafeAreaContainer>
    )
}