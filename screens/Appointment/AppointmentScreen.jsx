import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import { CheckCircleIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import ServiceSelect from "./ServiceSelect";
import ClinicSelect from "./ClinicSelect";
import DentistSelect from "./DentistSelect";
import TimeSelect from "./TimeSelect";
import SummaryScreen from "./SummaryScreen";
import { useNavigation } from "@react-navigation/native";
import ModalDialog from "../../components/ModalDialog";
import { bookAppointment } from "../../services/appointmentservices";
import { AuthContext } from "../../context/AuthContext";
import { parse, format } from 'date-fns';

const AppointmentScreen = () => {

    const { user } = useContext(AuthContext);
    const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    const [title, setTitle] = useState('Appointment');
    const totalSteps = 5;
    const [modalMessage, setModalMessage] = useState('');

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const navigation = useNavigation();

    const nextStep = (data, screenTitle) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(currentStep + 1);

    };
    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const handleSubmit = async () => {




        let patient_id = user.patient.id;

        let clinic_id = formData.selectedClinic.id;


        let clinic_dentist_id = formData.selectedDentist.id;
        let time_slot = formData.selectedSlot.split(' ')[0];
        // let appointment_date = formData.selectedDate;

        let selectedService = formData.selectedItems.name;
        let dental_service_id = formData.selectedItems.id;

        const inputFormat = "E MMM dd yyyy";

        const parsedDate = parse(formData.selectedDate, inputFormat, new Date());
        const outputFormat = "yyyy-MM-dd";
        const appointment_date = format(parsedDate, outputFormat);

console.log(patient_id, clinic_id, appointment_date, time_slot,
    clinic_dentist_id, dental_service_id);

        try{
            const response = await bookAppointment(
                patient_id, clinic_id, appointment_date, time_slot,
                clinic_dentist_id, dental_service_id)
            // console.log(response);
    
            if (response.status === 200) {
                setModalMessage(`Your Appointment for ${selectedService} at ${formData.selectedClinic.name} on ${formData.selectedDate}, ${formData.selectedSlot} will be confirmed shortly`);
                setConfirmVisible(true);
            }
    
        }

        catch (error){
            console.log("error")
            console.log(error.response)
        }

    

        // setModalMessage(message);
        // 
    };

    const handleCancel = () => {
        setCurrentStep(1);
        setFormData({});
        navigation.navigate('Home', { screen: "HomeScreen" });

    }

    const handleModalConfirm = () => {

        setCurrentStep(1);
        setFormData({});
        setConfirmVisible(false);
        navigation.navigate('Home', { screen: "HomeScreen" });
    }


    const renderStep = () => {

        switch (currentStep) {
            case 1:
                return <ServiceSelect theme={theme}
                    onNext={nextStep}
                    handleCancel={handleCancel}
                    currentStep={1}
                    totalSteps={totalSteps}
                    nextStep={2} />
            case 2:
                return <ClinicSelect theme={theme}
                    onNext={nextStep}
                    handleCancel={handleCancel}
                    currentStep={2}

                    totalSteps={totalSteps}
                    nextStep={3}
                    prevStep={prevStep}
                    gStyles={styles} />
            case 3:

                return <DentistSelect
                    theme={theme}
                    gStyles={styles}
                    clinic={formData.selectedClinic}
                    onNext={nextStep}
                    handleCancel={handleCancel}
                    prevStep={prevStep}
                />
            case 4:
                return <TimeSelect theme={theme} gStyles={styles} onNext={nextStep}
                    handleCancel={handleCancel}
                    prevStep={prevStep} />
            case 5:
                return <SummaryScreen theme={theme} onNext={nextStep} summaryData={formData}
                    handlePress={handleSubmit}
                    prevStep={prevStep} gStyles={styles} />
        }
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[{ flex: 1 }, styles.container, styles.safeAreaContainer]}>

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ChevronLeftIcon size={20} />
                        </TouchableOpacity>

                    </View>

                    <Text>{title}</Text>
                    <Text> {currentStep} of 5</Text>

                </View>

                <View style={{ height: 10, width: '100%', backgroundColor: '#e0e0de', borderRadius: 5, display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                    <View style={{ height: 10, backgroundColor: theme.blue, borderRadius: 5, width: `${progress}%`, alignItems: "flex-end", paddingEnd: 2, paddingTop: 1 }}>
                        <View style={{ height: 8, backgroundColor: theme.white, width: 8, borderRadius: 5 }} />

                    </View>


                </View>

                <View style={{ flex: 1, display: 'flex' }}>
                    {renderStep()}
                    {/* <View style={{ flex: 1 }}>


                    </View> */}



                </View>



            </SafeAreaView>


            {/* Modal Dialog */}
            <ModalDialog
                icon={<CheckCircleIcon height={100} size={80} color={"#0F172A"} />}
                visible={isConfirmVisible}
                title="Congratulations"
                message={modalMessage}
                onConfirm={handleModalConfirm}

            />


        </SafeAreaProvider>

    );
};

export default AppointmentScreen;
