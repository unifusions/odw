import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { useContext, useState } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
import { CurrencyDollarIcon, ExclamationCircleIcon, FolderPlusIcon, ReceiptPercentIcon, TrashIcon } from "react-native-heroicons/outline";
import ButtonWrapper from "../Appointment/ButtonWrapper";
import CancelButton from "../Appointment/CancelButton";
import NextPrevButtonWrapper from "../Appointment/NextPrevButtonWrapper";
import NextButton from "../Appointment/NextButton";
import SafeAreaContainerStepForm from "../../components/SafeAreaContainerStepForm";
import * as DocumentPicker from "expo-document-picker";

import ModalDialog from "../../components/ModalDialog";
import { ExclamationCircleFill } from "react-bootstrap-icons";
import LoadingDots from "../../components/LoadingDots";
import Card from "../../components/Card";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import RadioInput from "../../components/RadioInput";

export default function AdditionalInformation({ onNext, handleCancel }) {

    const { theme } = useContext(ThemeContext);
    const { height } = Dimensions.get('window');

    const [userRequest, setUserRequest] = useState('');
    const [visits] = useState([
        { id: 1, name: '< week' },
        { id: 2, name: '< 2 weeks' },
        { id: 3, name: '< 1 month' },
        { id: 4, name: '1-3 months' },
        { id: 5, name: '> 3 months' },
        { id: 6, name: 'Never' }
    ])

    const [overlay, setOverlay] = useState(false);
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const [lastVisit, setLastVisit] = useState('Please Select');
    const handleInsuranceSelect = (insurance) => {
        setSelectedInsurance(insurance);
        setOverlay(false);
    };

    const [formData, setFormData] = useState({

       
        description: '',
        last_visit: null,
        is_quick: false
    });

    const [documents, setDocuments] = useState([]);

    const handleNext = () => {
        let description =
        {
            userRequest: userRequest,
            
            otherData: formData,
            documents : documents

        };

        onNext({ description });
 



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

    const pickDocuments = async () => {


        if (documents.length >= 5) {
            alert("Maximum of 5 attachments allowed");
            setLoading(false);
            return;
        }

        try {
            const result = await DocumentPicker.getDocumentAsync({
                multiple: true,
                type: "*/*",
                copyToCacheDirectory: true,
            });

            let newFiles = [];

            if (result.assets) {
                // New API (multiple selection or new Expo versions)
                newFiles = result.assets;
            } else if (result.type === "success") {
                // Old API (single file)
                newFiles = [result];
            }

            if (newFiles.length > 0) {
                const combined = [...documents, ...newFiles];
                setDocuments(combined.slice(0, 5));
            }
        } catch (err) {
            console.log("DocumentPicker error:", err);
        }


    };


    const removeDocument = (uri) => {
        setDocuments((prev) => prev.filter((doc) => doc.uri !== uri));
    };

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
                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 16 }}>
                            <Card>
                                <FloatingLabelInput
                                    label="Tell Us More About Your Concern"
                                    textChange={setUserRequest}
                                    value={userRequest}
                                    multiline={true}

                                />

                                <RadioInput
                                    label="When was your last visit?"
                                    options={visits}
                                    handleSelect={(item) => setFormData({ ...formData, last_visit: item })}
                                    selectedOption={formData.last_visit}
                                />


                            </Card>

                            <Card  >
                                <Text style={{ fontFamily: theme.font600, fontSize: 14, marginBottom: 6 }} >Upload Any Relevant Documents</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, }}>
                                    <TouchableOpacity style={{
                                        flex: 1,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: '#99A3A4', // Light grey for dashed border effect
                                        borderStyle: 'dashed',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 20,
                                        maxHeight: 120,
                                        marginBottom: 10
                                    }} onPress={pickDocuments}>

                                        <>
                                            <FolderPlusIcon size={36} color={theme.primary} style={{ marginEnd: 16 }} />
                                            <Text style={{ fontFamily: theme.font500, fontSize: 12, }}>E.g. estimates, X-rays, treatment Plan</Text>
                                        </>

                                    </TouchableOpacity>



                                </View>

                                {documents.map((doc, idx) => (
                                    <View key={idx} style={{
                                        flexDirection: "row", marginBottom: 10, justifyContent: "space-between",
                                        paddingVertical: 8,
                                        borderWidth: 1,
                                        borderColor: theme.border,
                                        paddingHorizontal: 8,
                                        borderRadius: 10

                                    }} >
                                        <Text style={{ fontFamily: theme.font500 }}>{doc.name}</Text>
                                        <TouchableOpacity style={{ backgroundColor: theme.danger, padding: 6, borderRadius: 5 }}
                                            onPress={() => removeDocument(doc.uri)}
                                        >
                                            <TrashIcon color={theme.white} size={16} />
                                        </TouchableOpacity>
                                    </View>
                                ))
                                }
                            </Card>


                        </ScrollView>
                        {/* <View style={{ flex: 1 }}>
                            <View>




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
                        </View> */}
                        {/* <AddInsuranceOverlay visibility={overlay} requestClose={() => setOverlay(false)} onSelect={handleInsuranceSelect} /> */}

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