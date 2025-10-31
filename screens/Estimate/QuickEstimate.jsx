import { Dimensions, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { useContext, useState } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
import { CurrencyDollarIcon, ExclamationCircleIcon, ReceiptPercentIcon } from "react-native-heroicons/outline";
import AddInsuranceOverlay from "./AddInsuranceOverlay";
import ModalDialog from "../../components/ModalDialog";
import LoadingDots from "../../components/LoadingDots";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import BottomSheetDialog from "../../components/BottomSheetDialog";
import { useNavigation } from "@react-navigation/native";

export default function QuickEstimate() {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const { height } = Dimensions.get('window');
    const navigation = useNavigation();

    const [userRequest, setUserRequest] = useState('');

    const [overlay, setOverlay] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [selectedInsurance, setSelectedInsurance] = useState(null);

    const [processing, setProcessing] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const handleInsuranceSelect = (insurance) => {
        setSelectedInsurance(insurance);
        setOverlay(false);
    };

    const [bottomConfirm, setBottomConfirm] = useState(false);

    const handleNext = () => {

        if (selectedInsurance) {
            formSubmit();
        }
        else {
            setBottomConfirm(true);
        }



    };

    const formSubmit = async () => {
        setProcessing(true);


        let finalFormData = new FormData();
        finalFormData.append('patient_id', user.patient.id);
        finalFormData.append('user_id', user.id);
        finalFormData.append('description', userRequest);

        finalFormData.append('insurance_id', selectedInsurance?.id ?? null);
        finalFormData.append('is_quick', 1);

        const headers = { 'Content-Type': 'application/json' };
        // ;


        try {
            const response = await api.post('/estimation', finalFormData, { headers });
            if (response.status == 200) {
            
                // setModalMessage("Thanks for submitting your estimate request. Our team is reviewing your information.");
                // setModalMessage("Thanks for submitting your estimate request. Our team is reviewing your information.")

                setConfirmVisible(true);
              
                setProcessing(false);
            }
        }

        catch (error) {
            console.log("error", error.response.data)
        }

        setProcessing(false);

    }

    const handleBottomConfirm = () => {
        setBottomConfirm(false);
        formSubmit();

    }
    const handleModalConfirm = () => {
        setSelectedInsurance(null);
        setUserRequest('');
        setConfirmVisible(false);
        navigation.navigate('Home', { screen: "HomeScreen" });


    }
    return (
        <SafeAreaContainer
            screenTitle='Quick Estimate'
            allowedBack={true}>
            <View>
                <Text
                    style={{ fontFamily: theme.font500, fontSize: 16, marginBottom: 16 }}
                >Tell Us More About Your Concern</Text>
                <TextInput

                    multiline={true}
                    placeholder="Let us know what’s bothering you - any pain, symptoms, goals? Or is this just a regular check-up"
                    style={{
                        textAlignVertical: 'top',
                        borderRadius: 6, fontFamily: theme.font500,
                        paddingHorizontal: 12,
                        marginBottom: 16,
                        backgroundColor: theme.white, height: (height / 4), borderColor: theme.border, borderWidth: 1
                    }}
                    value={userRequest}
                    onChangeText={setUserRequest}
                />

                <View style={{ marginVertical: 16 }}>
                    <TouchableOpacity style={{ width: '100%' }} onPress={() => setOverlay(true)}>
                        <View style={{
                            backgroundColor: theme.white, borderRadius: 6, borderColor: theme.border, borderWidth: 1,
                            padding: 12, flexDirection: "row", width: '100%', justifyContent: 'space-between'
                        }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontFamily: theme.font700, fontSize: 16, marginBottom: 3 }}>Add Insurance</Text>
                                <Text style={{ fontFamily: theme.font500, fontSize: 12 }}>See what’s covered and what you will actually pay</Text>
                            </View>
                            <View>
                                <CurrencyDollarIcon color={theme.success} size={40} />
                            </View>
                        </View>

                    </TouchableOpacity>
                </View>
                <AddInsuranceOverlay visibility={overlay} requestClose={() => setOverlay(false)} onSelect={handleInsuranceSelect} />


                {processing ? <LoadingDots /> :

                    <TouchableOpacity style={{ flexGrow: 1, alignContent: 'center' }} onPress={handleNext}>
                        <View style={{ backgroundColor: '#F97835', alignItems: 'center', padding: 16, borderRadius: 8 }}>
                            <Text style={{ color: theme.white, fontFamily: theme.font700, fontSize: 16 }}>Continue</Text>

                        </View>
                    </TouchableOpacity>

                }
            </View>

            <ModalDialog
                icon={<ExclamationCircleIcon size={80} color={theme.amber} />}
                visible={isConfirmVisible}
                title="Estimate Request Submitted"
                message="Thanks for submitting your estimate request. Our team is reviewing your information."
                onConfirm={handleModalConfirm}
                onCancel={() => setConfirmVisible(false)}
                confirmText="Continue"
            />

            <BottomSheetDialog
                visible={bottomConfirm}
                title="Continue without Insurance ? "
                message="Are you sure to continue without insurance?"
                onConfirm={handleBottomConfirm}
                onCancel={() => setBottomConfirm(false)}
                confirmText="Yes, Continue"
            />

        </SafeAreaContainer>
    )
}