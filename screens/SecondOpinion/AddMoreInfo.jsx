import { FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import SecondOpinionWrapper from "./SecondOpinionWrapper";
import { useSecondOpinion } from "../../context/SecondOpinionContext";
import useDentalCares from "../../hooks/useDentalCares";
import ServicesList from "../../components/ServicesList";
import { useEffect, useState } from "react";
import Snackbar from "../../components/Snackbar";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import Card from "../../components/Card";
import RadioInput from "../../components/RadioInput";
import * as DocumentPicker from "expo-document-picker";
import UploadDocuments from "./UploadDocuments";
import { useTheme } from "../../theme/ThemeProvider";
import { TrashIcon } from "react-native-heroicons/outline";
const visits = [
    { id: 1, name: '< week' },
    { id: 2, name: '< 2 weeks' },
    { id: 3, name: '< 1 month' },
    { id: 4, name: '1-3 months' },
    { id: 5, name: '> 3 months' },
    { id: 6, name: 'Never' }
];

export default function AddMoreInfo() {

    const { theme } = useTheme();
    const { secondOpinion, updateSecondOpinion } = useSecondOpinion();

    const pickDocuments = async () => {
        const documents = secondOpinion.documents || [];

        if (documents.length >= 5) {
            alert("Maximum of 5 attachments allowed");
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
                newFiles = result.assets;
            } else if (result.type === "success") {
                newFiles = [result];
            }

            if (newFiles.length > 0) {
                const combined = [...documents, ...newFiles];
                updateSecondOpinion({ documents: combined.slice(0, 5) }); // ✅ store in context
            }
        } catch (err) {
            console.log("DocumentPicker error:", err);
        }
    };

    const removeDocument = (uri) => {
        updateSecondOpinion({
            documents: secondOpinion.documents.filter((doc) => doc.uri !== uri),
        });
    };




    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <SecondOpinionWrapper screenTitle="Additional Information"
                    >

                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 16 }}>
                            <Card>
                                <FloatingLabelInput
                                    label="Tell Us More About Your Concern"
                                    textChange={(text) => updateSecondOpinion({ description: text })}
                                    value={secondOpinion?.description}
                                    multiline={true}

                                />

                                <RadioInput
                                    label="When was your last visit?"
                                    options={visits}
                                    handleSelect={(item) => updateSecondOpinion({ last_visit: item })}
                                    selectedOption={secondOpinion?.last_visit}
                                />

                            </Card>

                            <Card>
                                <UploadDocuments handlePress={pickDocuments} />
                                {secondOpinion?.documents?.map((doc, idx) => (
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


                    </SecondOpinionWrapper>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </>


    )
}