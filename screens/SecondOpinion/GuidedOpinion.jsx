import { Alert, Dimensions, Platform, Text, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import SafeAreaContainerStepForm from "../../components/SafeAreaContainerStepForm";
import { useContext, useState } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import CategorySelect from "../Estimate/CategorySelect";
import CareSelect from "../Estimate/CareSelect";

import OpinionSummary from "./OpinionSummary";
import AdditionalInformation from "./AdditionalInformation";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import ModalDialog from "../../components/ModalDialog";
import { CheckCircleIcon } from "react-native-heroicons/outline";

export default function GuidedOpinion() {

    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(1);

    const [loading, setLoading] = useState(false);
    const { width } = Dimensions.get('window');
    const [formData, setFormData] = useState({});
    // const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const navigation = useNavigation();

    const nextStep = (data, screenTitle) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(currentStep + 1);

        console.log(formData);
    };
    const prevStep = () => {
        setCurrentStep(currentStep - 1);
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
    const formSubmit = async () => {

        let finalFormData = new FormData();
        finalFormData.append('patient_id', user.patient.id);
        finalFormData.append('description', formData?.description?.userRequest);
        finalFormData.append('last_visit', formData?.description?.otherData?.last_visit?.name);
        formData?.selectedItems.forEach((item, i) => {
            finalFormData.append('dental_cares[]', item.id)
        })
        finalFormData.append('is_quick', false);

        formData?.description?.documents.forEach((doc, i) => {
            const file = doc.uri ? doc : doc.assets?.[0];

            const newImageUri =
                Platform.OS === "ios"
                    ? file.uri.replace("file://", "")
                    : file.uri;


            finalFormData.append('attachments[]', {
                uri: newImageUri,
                type: file.mimeType || 'application/octet-stream',
                name: file.name || `file_${i}`,
            });

        })

        let headers = { 'Content-Type': 'multipart/form-data' };
        try {

            setLoading(true);


            const response = await api.post('/second-opinions/store', finalFormData, { headers })
            if (response.status == 200) {
                
                setConfirmVisible(true);
            }


            setLoading(false);
        }
        catch (error) {

            setLoading(false);

            console.log("Upload Error", error.response.data);

        }
    }
    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <CategorySelect
                    title="Treatments"
                    onNext={nextStep}
                    handleCancel={handleCancel}
                    currentStep={1}

                    totalSteps={5}
                />
            case 2:
                return <CareSelect title="Select Services" currentStep={2} prevStep={prevStep}
                    onNext={nextStep} handleCancel={handleCancel} />
            case 3: return <AdditionalInformation onNext={nextStep} handleCancel={handleCancel} />
            case 4: return <OpinionSummary formData={formData} prevStep={prevStep} currentStep={currentStep} handlePress={formSubmit} />
        }

    }
    return (
        <>
            {renderStep()}
            < ModalDialog
                icon={< CheckCircleIcon height={100} size={80} color={"#0F172A"} />}
                visible={isConfirmVisible}
                title="Second Opinion Request Received"
                message="Thanks for submitting your treatment plan for a second opinion. Our team is reviewing the information."
                onConfirm={handleModalConfirm}

            />
        </>

    )
}