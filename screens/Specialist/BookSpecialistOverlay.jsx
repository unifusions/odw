import { Dimensions, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../theme/ThemeProvider";
import { CalendarDaysIcon, CalendarIcon, CheckCircleIcon, ClockIcon, ListBulletIcon, MapPinIcon, UserIcon, XCircleIcon } from "react-native-heroicons/outline";
import generateDates from "../../helpers/generateDates";
import { useNavigation, useRoute } from "@react-navigation/native";
import ScrollableDatePicker from "../../components/ScrollableDatePicker";
import { useState } from "react";
import TimeSlotPicker from "../../components/TimeSlotPicker";
import { getClinicDistance } from "../../services/getDistanceInMiles";
import { useBooking } from "../../context/BookingContext";
import Card from "../../components/Card";
import RowItem from "../../components/RowItem";
import { practiseYearCalculator } from "../../helpers/practiseyears";
import NextButton from "../Appointment/NextButton";





const BookSpecialistOverlay = ({ visibility, requestClose,
}) => {


    const { booking, confirmBooking, resetBooking, hasError } = useBooking();
    const { theme } = useTheme();

    const [confirmed, setConfirmed] = useState(false);

    const [originalBooking, setOriginalBooking] = useState();

    const navigation = useNavigation();
    const styles = StyleSheet.create({
        insuranceButton: {
            marginTop: 20,
            padding: 16,
            backgroundColor: '#f0f0f0',
            borderRadius: 12,
            alignItems: 'center'
        },
        modalBackground: {
            flex: 1,
            justifyContent: 'flex-end', // Bottom sheet effect
            backgroundColor: 'rgba(0,0,0,0.3)', // dim background
        },
        modalContent: {
            backgroundColor: '#f0f0f0',
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            minHeight: '65%', // partial screen
        },


    });


    return (
        <Modal
            transparent
            animationType="slide"
            visible={visibility}
            onRequestClose={requestClose}
        >

            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    {
                        confirmed ?
                            <>
                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%" }}>
                                    <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
                                        <CheckCircleIcon color={theme.success} size={60} />
                                    </View>

                                    <Text style={{ fontFamily: theme.font700, fontSize: 24 }}>Appointment Requested</Text>
                                    <Text style={{ fontFamily: theme.font500, fontSize: 14, textAlign: "center", marginBottom: 20 }}>Thanks  for booking your dental appointment with One Dental World Specialist {booking.specialist.name}. Your request has been received and is being processed.</Text>


                                    <Card  >
 
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginVertical: 20 }}>
                                            <CalendarDaysIcon color={theme.blue} size={30} style={{ marginEnd: 20 }} />
                                            <View>
                                                <Text style={{ fontSize: 16, fontFamily: theme.font600 }}>{booking?.time?.selectedDate?.fullDate} {booking?.time?.selectedSlot}</Text>
    
                                            </View>
                                        </View>

                                        
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginBottom: 10 }}>
                                            <MapPinIcon color={theme.blue} size={30} style={{ marginEnd: 20 }} />
                                            <View>
                                                <Text style={{ fontSize: 16, fontFamily: theme.font600 }}>{booking?.clinic?.name}</Text>
                                                <Text style={{ fontSize: 14, fontFamily: theme.font400 }}>{booking?.clinic?.address_line_1}</Text>
                                                <Text style={{ fontSize: 14, fontFamily: theme.font400 }}>{booking?.clinic?.address_line_2}</Text>
                                                {booking?.clinic?.address_line_3 && <Text style={{ fontSize: 14, fontFamily: theme.font400 }}>{booking?.clinic?.address_line_3}
                                                </Text>}
                                                <Text style={{ fontSize: 14, fontFamily: theme.font400 }}>{booking?.clinic?.city} - {booking?.clinic?.zip_code}</Text>
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
                            </> :

                            <>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                    <Text style={{ fontSize: 18, fontWeight: '700', }}>
                                        Confirm  Appointment  
                                    </Text>

                                    <TouchableOpacity onPress={requestClose}>
                                        <XCircleIcon color={theme.danger} />

                                    </TouchableOpacity>
                                </View>

                                <ScrollView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
                                   
                                    <Card>
                                        <RowItem
                                            icon={<MapPinIcon color={theme.blue} />}
                                            title={booking?.clinic?.name}
                                            hasError ={!booking?.clinic}
                                            
                                            fieldError={'Please select clinic' }
                                        // subTitle={booking.selectedClinic.address_line_1 + ', ' + booking.selectedClinic.address_line_2}
                                        />

                                        <RowItem
                                            icon={<UserIcon color={theme.blue} />}
                                            title={booking?.specialist?.name}
                                            subTitle={`${practiseYearCalculator(booking?.specialist?.practise_from)} years of practise`}
                                        />

                                        <RowItem
                                            icon={<CalendarIcon color={theme.blue} />}
                                            title={booking?.time?.selectedDate?.fullDate}
                                            hasError={!booking?.time?.selectedDate }
                                              fieldError={  'Please select Date' }
                                            

                                        />

co
                                        <RowItem
                                            icon={<ClockIcon color={theme.blue} />}
                                            title={booking?.time?.selectedSlot}
                                            hasError= {!booking?.time?.selectedSlot }
                                             fieldError={'Please select Time' }
                                        // subTitle={booking?.selectedDate}booking?.time?.selectedSlot +
                                        />



                                    </Card>
                                    
                                    <NextButton
                                    theme={theme}
                                    label="Confirm"
                                    isConfirm={true}
                                    fullWidth={true}
                                    isDisabled={hasError}
                                    handlePress={async () => {
                                        // setLoading(true);
                                        try {
                                            const bookingRequest = await confirmBooking();
                                                setOriginalBooking(bookingRequest);
                                                setConfirmed(true);
                                            // navigation.replace("Confirmation", { bookingRequest: bookingRequest });

                                        } catch (err) {
                                            // Alert.alert("Booking error:", err);
                                        }
                                        finally {
                                            // setLoading(false);
                                        }
                                    }}
                                />


                                </ScrollView>



                            </>
                    }








                </View>
            </View>

        </Modal>
    )
}

export default BookSpecialistOverlay;