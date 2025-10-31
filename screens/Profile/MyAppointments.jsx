import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, useTheme } from "../../theme/ThemeProvider";
import { BuildingOfficeIcon, UserCircleIcon } from "react-native-heroicons/outline";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { myAppointments } from "../../services/appointmentservices";
import { format } from "date-fns";
import Card from "../../components/Card";
import { EyeIcon } from "react-native-heroicons/solid";
import LoadingDots from "../../components/LoadingDots";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";
import { useNavigation } from "@react-navigation/native";
import useAppointments from "../../hooks/useAppointments";

const MyAppointments = () => {
    const { theme } = useTheme();
    const { user } = useAuth();
  


    const { openBookings, pendingBookings,loading, errors } = useAppointments({ patientId: user.patient.id });
    const navigation = useNavigation();
    const styles = StyleSheet.create({
        timeslot: { fontFamily: theme.font600, marginBottom: 6 },
        dentalService: { fontFamily: theme.font700, marginBottom: 6 }
    })


    const DayItem = ({ month, day }) => {
        return (
            <View style={{ display: "flex", justifyContent: "flex-start", alignContent: "flex-start", alignItems: "center", marginEnd: 16 }} >

                <Text>{month}</Text>


                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <View style={{
                        padding: 8,

                        backgroundColor: theme.blue,
                        justifyContent: 'center',

                        alignItems: "center",
                        borderRadius: 100
                    }}>
                        <Text style={{ color: theme.white }} >{day}</Text>
                    </View>


                </View>


            </View>)
    }

    const SectionHeader = ({ sectionTitle, isOngoing, count = 0 }) => {
        return (
            <View style={{
                display: "flex", flexDirection: "row",
                alignItems: "center", marginBottom: 16,
            }}>
                <View style={{
                    height: 8,
                    width: 8,
                    borderRadius: 100,
                    backgroundColor: isOngoing ? theme.blue : theme.success

                }}></View>
                <Text style={{ marginStart: 8, fontFamily: theme.font600 }} >{sectionTitle}  ({count})  </Text>
                <View style={{
                    marginTop: 6,
                    marginStart: 8,
                    height: 2,
                    flex: 1,
                    backgroundColor: theme.border
                }}></View>
            </View>

        )
    }
    const AppointmentInfo = ({ timeSlot, dentalService, clinic, dentist, provider }) => {

        const isDentist = provider?.type === 'Dentist' ? true : false;
        return (<>


            <Text style={styles.timeslot}
            >{timeSlot}</Text>
            {isDentist && <Text style={styles.dentalService}
            >{dentalService}</Text>}
            <View style={{
                flexDirection: "row", justifyContent: "flex-start",
                alignItems: "center"
            }}>
                <BuildingOfficeIcon color={theme.gray} size={16} style={{ marginEnd: 6 }} />

                <Text
                    style={{
                        fontFamily: theme.font500,
                        marginBottom: 6, color: theme.gray
                    }}
                >{clinic}</Text >

            </View>

            <View style={{
                flexDirection: "row", justifyContent: "flex-start",
                alignItems: "center"
            }}>
                <UserCircleIcon color={theme.gray} size={16} style={{ marginEnd: 6 }} />

                <Text
                    style={{
                        fontFamily: theme.font500,
                        marginBottom: 6, color: theme.gray
                    }}
                > {provider?.name}

                </Text >

            </View>







        </>)
    }
    const AppointmentCard = ({ timeSlot, dentalService, clinic, provider, dentist, handlePress }) => {


        return (

            <View style={{
                flexGrow: 1, borderWidth: 1, borderRadius: 6,
                borderStyle: "solid", borderColor: theme.border, padding: 8
            }}>

                <AppointmentInfo
                    timeSlot={timeSlot}
                    dentalService={dentalService}
                    clinic={clinic}
                    dentist={dentist}
                    provider={provider}
                />
            </View>


        )
    }

    const StatusDot = ({ color }) => {
        function switchColor(themeColor) {

            switch (themeColor) {
                case 'primary':
                    return theme.primary;
                    break;
                case 'blue':
                    return theme.blue;
                    break;
                case 'danger':
                    return theme.danger;
                    break;
                default:
                    break;
            }
        }
        return (
            <View style={{
                height: 8,
                width: 8,
                marginEnd: 16,
                borderRadius: 100,
                backgroundColor: switchColor(color)

            }}></View>
        )

    }
    return (

        <ScrollView showsVerticalScrollIndicator={false}>




            <Card title={<><StatusDot color="blue" /> Upcoming ({openBookings?.length})</>}>




                {openBookings && openBookings?.length > 0 && <>

                    {openBookings.map((item, index) =>

                        <View key={item.id} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginBottom: 16 }}>
                            <DayItem key={item.id} month={format(item.appointment_date, 'LLL')} day={format(item.appointment_date, 'dd')} />
                            <AppointmentCard key={item.id} timeSlot={item.appointment_time}
                                dentalService={item.service}
                                clinic={item.clinic}
                                dentist={item.dentist}
                                handlePress={() => console.log(item)}
                            />

                        </View>

                    )}
                </>}
            </Card>


            <Card title={<><StatusDot color="danger" /> Pending ({pendingBookings?.length})</>}>
                {pendingBookings && pendingBookings?.length > 0 && <>

                    {pendingBookings.map((item, index) =>

                        <TouchableOpacity key={item.id}
                            onPress={() => navigation.navigate("Appointment", { appointment: item })}
                            style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginBottom: 16 }}>
                            <DayItem key={item.id} month={format(item.appointment_date, 'LLL')} day={format(item.appointment_date, 'dd')} />
                            <AppointmentCard key={item.id} timeSlot={item.appointment_time}
                                dentalService={item?.service?.name ?? ''}
                                clinic={item.clinic}
                                dentist={item.dentist?.name}
                                provider={item?.provider}

                            />

                        </TouchableOpacity>

                    )}

                </>}

            </Card>


            {loading && <LoadingDotsWithOverlay />}


        </ScrollView>



    )
}

export default MyAppointments;