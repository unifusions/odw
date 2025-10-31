import { Dimensions, Text, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import SafeAreaContainerStepForm from "../../components/SafeAreaContainerStepForm";
import { useContext, useState } from "react";
import ButtonWrapper from "../Appointment/ButtonWrapper";
import CancelButton from "../Appointment/CancelButton";
import NextPrevButtonWrapper from "../Appointment/NextPrevButtonWrapper";
import NextButton from "../Appointment/NextButton";
import { ThemeContext } from "../../theme/ThemeProvider";
import CategorySelect from "./CategorySelect";
import CareSelect from "./CareSelect";
import Description from "./Description";
import { useNavigation } from "@react-navigation/native";
import EstimateSummary from "./EstimateSummary";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import ModalDialog from "../../components/ModalDialog";
import { CheckCircleIcon } from "react-native-heroicons/outline";

export default function GuidedEstimate() {

    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const [currentStep, setCurrentStep] = useState(1);

    const { width } = Dimensions.get('window');
    const [formData, setFormData] = useState({});
    // const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const navigation = useNavigation();

    const [modalMessage, setModalMessage] = useState('');

    const [processing, setProcessing] = useState(false);
    const nextStep = (data, screenTitle) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(currentStep + 1);


    };
    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const handleCancel = () => {
        setCurrentStep(1);
        setFormData({});
        navigation.navigate('Home', { screen: "HomeScreen" });

    }



    const formSubmit = async () => {

        setProcessing(true);
        let finalFormData = new FormData();
        let selectedItems;
        finalFormData.append('patient_id', user.patient.id);
        finalFormData.append('user_id', user.id);

        finalFormData.append('insurance_id', formData?.description?.selectedInsurance?.id ?? null);

       
        finalFormData.append('dental_service_id', formData.category.id);
        finalFormData.append('description', formData.description.userRequest);
        finalFormData.append('is_quick', 0);
        formData.selectedItems.forEach((item) => {
            finalFormData.append('dentalcares[]', item.id);
        });
        const headers = { 'Content-Type': 'application/json' };

        try {
            const response = await api.post('/estimation', finalFormData, { headers });
            if (response.status == 200) {
                setModalMessage(`Thanks for submitting your estimate request. Our team is reviewing your information.`);
                setConfirmVisible(true);
            }
        }

        catch (error) {
            console.log("error", error.response.data)
        }

        setProcessing(false);
        // console.log(finalFormData)
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
                return <CategorySelect
                    title="Select Category"
                    onNext={nextStep}
                    handleCancel={handleCancel}
                    currentStep={currentStep}

                />
            case 2:
                return <CareSelect
                    treatment={formData.category.id}
                    title="Select Treatments"
                    currentStep={currentStep}
                    onNext={nextStep} handleCancel={handleCancel} prevStep={prevStep} />
            case 3: return <Description onNext={nextStep} handleCancel={handleCancel} prevStep={prevStep} />
            case 4: return <EstimateSummary
                title="Summary"
                currentStep={currentStep}
                prevStep={prevStep}
                formData={formData}
                handlePress={formSubmit}
            />
        }

    }
    return (
        <>
            {/* {console.log(formData.category.id)} */}
            {renderStep()}
            <ModalDialog
                icon={<CheckCircleIcon  height={100} size={80} color={"#0F172A"} />}
                visible={isConfirmVisible}
                title="Congratulations"
                message={modalMessage}
                onConfirm={handleModalConfirm}

            />

        </>

    )
}