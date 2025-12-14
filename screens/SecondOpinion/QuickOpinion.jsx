import { Text, View, TextInput, Dimensions, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from "react-native";

import { useContext, useState } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
import { CheckCircleIcon, FolderPlusIcon, PlusIcon, TrashIcon } from "react-native-heroicons/outline";
import ServiceDropdown from "../../components/ServiceDropdown";
import BottomButton from "../../components/BottomButton";
import SafeAreaContainerKeyboardAvoiding from "../../components/SafeAreaContainerKeyboardAvoiding";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import Card from "../../components/Card";
import RadioInput from "../../components/RadioInput";

import * as DocumentPicker from "expo-document-picker";
import LoadingDots from "../../components/LoadingDots";
import api from "../../services/api";
import { AuthContext, useAuth } from "../../context/AuthContext";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";
import ModalDialog from "../../components/ModalDialog";
import { useNavigation } from "@react-navigation/native";


export default function QuickOpinion() {

    const { theme } = useContext(ThemeContext);
    const { height } = Dimensions.get('window');

    const { user } = useAuth();
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [visits] = useState([
        { id: 1, name: '< week' },
        { id: 2, name: '< 2 weeks' },
        { id: 3, name: '< 1 month' },
        { id: 4, name: '1-3 months' },
        { id: 5, name: '> 3 months' },
        { id: 6, name: 'Never' }
    ])

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        pillsContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            // justifyContent: "space-between"
            marginBottom: 16
        },
        pill: {
            padding: 6,
            borderWidth: 1,
            marginHorizontal: 6,
            marginVertical: 3,
            borderRadius: 6,
            borderColor: theme.primary
        },
        pillText: {
            fontFamily: theme.font400,
            fontSize: 14,
            color: theme.primary
        },

        pillSelected: {
            backgroundColor: theme.primary,
        },

        pillSelectedText: {
            color: theme.white,
            fontFamily: theme.font700
        },


    })
    const [lastVisit, setLastVisit] = useState('Please Select');
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        patient_id: user.patient.id,
        subject: '',
        description: '',
        lastVisit: null,
        is_quick: true
    });

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

    const submitForm = async () => {
        setLoading(true);
        let finalFormData = new FormData();

        Object.keys(formData).forEach(key => {
            if (formData[key] !== undefined && formData[key] !== null) {
                let value = formData[key];

                if (value instanceof Date) {
                    value = value.toISOString().split("T")[0]; // format DOB
                } else if (typeof value === "object" && value.name) {
                    value = value.name; // pick only "name" from object
                } else if (typeof value !== "string") {
                    value = String(value); // fallback for numbers/booleans
                }

                finalFormData.append(key, value);
            }
        });


        documents.forEach((doc, i) => {

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

        });


        let headers = { 'Content-Type': 'multipart/form-data' };


        try {




            const response = await api.post('/second-opinions/store', finalFormData, { headers })


            if (response.status == 200) {

                setConfirmVisible(true);
            }


        }
        catch (error) {



            Alert.alert("Error", "Check all fields in the form");

        }
        finally {
            setLoading(false);
        }

    }


    const handleModalConfirm = () => {


        setFormData({});
        setConfirmVisible(false);
        navigation.navigate('Home', { screen: "HomeScreen" });
    }

    return (
        <SafeAreaContainerKeyboardAvoiding screenTitle="Quick Opinion" allowedBack={true} >
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 16 }}>

                <Card>
                    <FloatingLabelInput
                        label="Subject"
                        textChange={(text) => setFormData({ ...formData, subject: text })}
                        value={formData.subject}
                        required={true}


                    />

                    <FloatingLabelInput
                        label="Describe Your Concern"
                        textChange={(text) => setFormData({ ...formData, description: text })}
                        value={formData.description}
                        multiline={true}
                        required={true}
                    />

                    <RadioInput
                        label="When was your last visit?"
                        options={visits}
                        handleSelect={(item) => setFormData({ ...formData, last_visit: item })}
                        selectedOption={formData.last_visit}
                        required={true}
                    />


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

                </Card>


                {/* <Text style={{ fontFamily: theme.font500, fontSize: 12, color: theme.mutedText, marginBottom: 12 }}>
                    What’s the issue or treatment you need a second opinion on? The more you
                    share, the better we can help
                </Text> */}




            </ScrollView>

            {loading && <LoadingDotsWithOverlay />}
            < ModalDialog
                icon={< CheckCircleIcon height={100} size={80} color={"#0F172A"} />}
                visible={isConfirmVisible}
                title="Second Opinion Request Received"
                message="Thanks for submitting your treatment plan for a second opinion. Our team is reviewing the information."
                onConfirm={handleModalConfirm}

            />
            <BottomButton value={"Request Second Opinion"} processing={loading} handlepress={submitForm} />




            {/* <TouchableOpacity style={{ alignContent: 'center' }}>
                <View style={{ backgroundColor: '#F97835', alignItems: 'center', padding: 16, borderRadius: 8 }}>
                    <Text style={{ color: theme.white, fontFamily: theme.font700, fontSize: 16 }}>Request Second Opinion</Text>

                </View>
            </TouchableOpacity> */}
        </SafeAreaContainerKeyboardAvoiding>
    )
}