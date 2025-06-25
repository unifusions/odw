import { ScrollView, Text, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
import { BuildingOfficeIcon, UserCircleIcon } from "react-native-heroicons/outline";
import { AuthContext } from "../../context/AuthContext";
import { myAppointments } from "../../services/appointmentservices";
import { format } from "date-fns";

const MyAppointments = () => {
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);
    const [openApps, setOpenApps] = useState([]);
    const [pendingApps, setPendingApps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pendingCount, setPendingCount] = useState();
    useEffect(() => {
        setLoading(true);
        myAppointments({ patient_id: user.patient.id }).then(
            response => {
                setOpenApps(response.open);
                setPendingApps(response.pending);
            }
        ).catch(console.error);

        setLoading(false);
    }, [])

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

    const SectionHeader = ({ isOngoing, count = 0 }) => {
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
                <Text style={{ marginStart: 8, fontFamily: theme.font600 }} >{isOngoing ? 'Upcoming' : ` Awaiting Confirmation (${count}) `}</Text>
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
    const AppointmentInfo = ({ timeSlot, dentalService, clinic, dentist }) => {
        return (<>
            <Text
                style={{ fontFamily: theme.font600, marginBottom: 6 }}
            >{timeSlot}</Text>
            <Text
                style={{ fontFamily: theme.font700, marginBottom: 6 }}
            >{dentalService}</Text>
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
                >{dentist}</Text >

            </View>



        </>)
    }
    const AppointmentCard = ({ timeSlot, dentalService, clinic, dentist }) => {
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
                />
            </View>
        )
    }
    return (
        <SafeAreaContainer
            screenTitle="Appointments"    allowedBack={true}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                

             

                {openApps.length >0 && <>
                    <SectionHeader isOngoing={true} />
                    {openApps.map((item) => <>
                      
                        <View key={item.id} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginBottom: 16 }}>
                            <DayItem month={format(item.appointment_date, 'LLL')} day={format(item.appointment_date, 'dd')} />
                            <AppointmentCard timeSlot={item.appointment_time}
                                dentalService={item.service}
                                clinic={item.clinic}
                                dentist={item.dentist}
                            />

                        </View>

                    </>)}
                </>}


                {pendingApps.length > 0 && <>
                    <SectionHeader isOngoing={false} count={pendingApps.length} />
                    {pendingApps.map((item) => <>
                        {console.log(item)}
                        <View key={item.id} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", marginBottom: 16 }}>
                            <DayItem month={format(item.appointment_date, 'LLL')} day={format(item.appointment_date, 'dd')} />
                            <AppointmentCard timeSlot={item.appointment_time}
                                dentalService={item.service}
                                clinic={item.clinic}
                                dentist={item.dentist}
                            />

                        </View>

                    </>)}

                </>}

            </ScrollView>

        </SafeAreaContainer>

    )
}

export default MyAppointments;