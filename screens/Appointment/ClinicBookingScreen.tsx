import { useContext, useState } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import ScreenHeader from "../../components/ScreenHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import ScrollableDatePicker from "../../components/ScrollableDatePicker";
import TimeSlotPicker from "../../components/TimeSlotPicker";
import ModalDialog from "../../components/ModalDialog";
import ServiceDropdown from "../../components/ServiceDropdown";
import { AuthContext } from "../../context/AuthContext";
import { bookAppointment } from "../../services/appointmentservices";
import { format, parse } from "date-fns";


export default function ClinicBookingScreen() {

    const { theme } = useContext(ThemeContext);
    const gStyles = getGlobalStyles(theme);
    const navigation = useNavigation();
 
    const route = useRoute();

    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const { clinic } = route.params;

    const { user } = useContext(AuthContext);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
    const [timeSlot, setTimeSlot] = useState();


    // Generate 30 days dynamically from today
    const generateDates = () => {
        return Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return {
                fullDate: date.toDateString(),
                day: date.toLocaleDateString("en-US", { weekday: "short" }), // "Mon", "Tue"
                dateNum: date.getDate(), // 15, 16, 17...
            };
        });
    };

    const dates = generateDates();

    const handleModalConfirm = () => {
        setConfirmVisible(false);
        setSelectedDate(new Date().toDateString());  // Reset to current date
        setSelectedService(null);                    // Reset selected service
        setTimeSlot("");                             // Reset time slot

        // Navigate back to home screen
        navigation.navigate('Home'); // Replace 'Home' with your actual home screen name
    }

    const handleSubmit = async () => {


        // Validate if any field is missing
        if (!selectedDate || !selectedService || !timeSlot) {
            Alert.alert("Missing Information", "Please select a date, service, and time slot.");
            return; // Stop the function from proceeding
        }

        let patient_id = user.patient ? user.patient.id : 0;
        let clinic_id = clinic.id

        const inputDate = new Date(selectedDate);

        const appointment_date = format(inputDate, 'yyyy-MM-dd');

        const clinic_branch_id = clinic.branches[0].id;
        const service_id = selectedService.id;
        const cleanedTime = timeSlot.replace(/\s|[\u202F\u00A0]/g, ' ').trim(); // normalize spaces

        const parsedTime = parse(cleanedTime, 'h:mm a', new Date());
        const time_slot = format(parsedTime, 'HH:mm:ss');


        const response = await bookAppointment(patient_id, clinic_id, appointment_date, clinic_branch_id, time_slot, service_id);

        if (response.status === 200) {

            setConfirmVisible(true);
        }
        if (response.status === 422)
            console.log("slot not available");
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[gStyles.safeAreaContainer, { flex: 1 }]}>
                <ScreenHeader
                    title={`New Appointment `}
                    onBackPress={() => navigation.goBack()}
                    RightIcon={CalendarDaysIcon}
                />


                {/* Scrollable Content */}
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                    <View style={gStyles.container}>
                        {clinic.branches.length <= 1 ? (
                            <>
                                <Image source={{ uri: "https://placehold.co/100x100.png" }} style={gStyles.bookingAvatar} />
                                <Text style={[gStyles.dentistName]}>{clinic.name}</Text>
                                <Text>{clinic.branches[0].name}</Text>
                                <Text style={[gStyles.textCenter, gStyles.textGrey, gStyles.textFont]}>{clinic.id}</Text>

                                <ScrollableDatePicker dates={dates} selectedDate={selectedDate} handleSelect={(item) => setSelectedDate(item.fullDate)} />

                                <TimeSlotPicker start={clinic.branches[0].opening_time}
                                    end={clinic.branches[0].closing_time} selectedTimeSlot={timeSlot} handleSelect={(item) => setTimeSlot(item)} />


                                <ServiceDropdown services={clinic.branches[0].services} onSelect={(item) => setSelectedService(item)}
                                    selectedService={selectedService}
                                />
                            </>
                        ) : (
                            <Text>This clinic has more than 1 branches</Text>
                        )}





                    </View>
                </ScrollView>

                {/* Fixed Bottom Button */}
                <View style={[gStyles.fixedBottomContainer]}>
                    <TouchableOpacity style={gStyles.cta} onPress={handleSubmit}>
                        <Text style={gStyles.buttonText}>Confirm Appointment</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Modal Dialog */}
            <ModalDialog
                visible={isConfirmVisible}
                title="Congratulations"
                message={`Your appointment with clinic ${clinic.branches[0].name} on ${selectedDate} at ${timeSlot} will be confirmed shortly`}
                onConfirm={handleModalConfirm}
            />
        </SafeAreaProvider>
    );
}
