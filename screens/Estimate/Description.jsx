import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { useContext, useState } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
import { CurrencyDollarIcon, ExclamationCircleIcon, ReceiptPercentIcon } from "react-native-heroicons/outline";
import ButtonWrapper from "../Appointment/ButtonWrapper";
import CancelButton from "../Appointment/CancelButton";
import NextPrevButtonWrapper from "../Appointment/NextPrevButtonWrapper";
import NextButton from "../Appointment/NextButton";
import SafeAreaContainerStepForm from "../../components/SafeAreaContainerStepForm";
import AddInsuranceOverlay from "./AddInsuranceOverlay";
import ModalDialog from "../../components/ModalDialog";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import LoadingDots from "../../components/LoadingDots";
import Card from "../../components/Card";

export default function Description({ onNext, handleCancel }) {

    const { theme } = useContext(ThemeContext);
    const { height } = Dimensions.get('window');

    const [userRequest, setUserRequest] = useState('');

    const [overlay, setOverlay] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [selectedInsurance, setSelectedInsurance] = useState(null);

    const handleInsuranceSelect = (insurance) => {
        setSelectedInsurance(insurance);
        setOverlay(false);
    };

    const handleNext = () => {
        let description =
        {
            userRequest: userRequest,
            selectedInsurance: selectedInsurance
        };

        if (selectedInsurance) {
            onNext({ description });
        }
        else {
            setConfirmVisible(true);
        }



    };

    const handleModalConfirm = () => {

        let description =
        {
            userRequest: userRequest,
            selectedInsurance: null
        };

        onNext({ description });
    }

    const DetailedLine = ({ label, value }) => {
        return (
            <View style={{ justifyContent: "space-between", flexDirection: "row", marginVertical: 2 }}>
                <Text style={{ fontFamily: theme.font500, letterSpacing: 0.5 }}>{label}</Text>
                <Text style={{ fontFamily: theme.font600, letterSpacing: 0.5 }}>{value}</Text>

            </View>
        )
    }


    return (
        <>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

                    <SafeAreaContainerStepForm
                        allowedBack={true}
                        screenTitle="Additional Information"
                        step={3}
                        stepCount={4}
                    >

                        <View style={{ flex: 1 }}>
                            <View>

                                <Text
                                    style={{ fontFamily: theme.font500, fontSize: 16, marginBottom: 16 }}
                                >Tell Us More About Your Concern</Text>

                                <TextInput

                                    multiline={true}
                                    placeholder="Let us know what’s bothering you - any pain, symptoms, goals? Or is this just a regular scheck-up"
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
                                {selectedInsurance && <>
                                    <Card title={selectedInsurance.insurance_provider}>
                                        <TouchableOpacity style={{ paddingVertical: 20 }} >



                                            <View>
                                                <Text style={{ fontFamily: theme.font600, fontSize: 18, marginBottom: 16 }}>{selectedInsurance.insurance_provider}</Text>

                                            </View>


                                            <DetailedLine label="Member ID" value={selectedInsurance.member_id} />
                                            <DetailedLine label="Relation" value={selectedInsurance.mode} />




                                        </TouchableOpacity>
                                    </Card>
                                </>}
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


                            </View>
                        </View>
                        <AddInsuranceOverlay visibility={overlay} requestClose={() => setOverlay(false)} onSelect={handleInsuranceSelect} />

                        <ButtonWrapper theme={theme} >
                            <CancelButton theme={theme} handlePress={handleCancel} />


                            <NextPrevButtonWrapper theme={theme}>

                                <NextButton theme={theme} handlePress={handleNext} />
                            </NextPrevButtonWrapper>





                        </ButtonWrapper >

                        <ModalDialog
                            icon={<ExclamationCircleIcon size={80} color={theme.amber} />}
                            visible={isConfirmVisible}
                            title="Continue without Insurance ? "
                            message="Are you sure to continue without insurance?"
                            onConfirm={handleModalConfirm}
                            onCancel={() => setConfirmVisible(false)}
                            confirmText="Continue"
                        />

                    </SafeAreaContainerStepForm>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </>



    )
}