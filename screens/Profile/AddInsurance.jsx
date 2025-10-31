import { useContext, useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, Alert, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import getGlobalStyles from "../../theme/globalStyles";
import { ThemeContext } from "../../theme/ThemeProvider";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import SelectInput from "../../components/SelectInput";
import SafeAreaContainerKeyboardAvoiding from "../../components/SafeAreaContainerKeyboardAvoiding";
import Card from "../../components/Card";
import RadioInput from "../../components/RadioInput";

import FloatingDatePicker from "../../components/FloatingDatePicker";
import { useNavigation } from "@react-navigation/native";
import { PhotoIcon } from "react-native-heroicons/outline";
import * as ImagePicker from 'expo-image-picker';
import api from "../../services/api";
import BottomButton from "../../components/BottomButton";
import { AuthContext } from "../../context/AuthContext";
import BottomSheetDialog from "../../components/BottomSheetDialog";
import BottomModal from "../../components/BottomModal";
import { CheckCircle } from "react-bootstrap-icons";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";

const AddInsurance = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const [front, setFront] = useState(null);
    const [back, setBack] = useState(null);

    const [isConfirm, setConfirm] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        relation: '',
        dob: '', //new Date(),
        address_line_1: "",
        address_line_2: "",
        address_line_3: "",
        state_id: '',
        city_id: '',
        zip_code_id: '',
        mode: "",
        insurance_provider: '',
        carrier: "",
        plan_no: "",
        status: "",
        member_id: "",
        is_current: 1,

    });


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            return result.assets[0]; // Return the selected asset
        }

        return null; // Return null if the user cancels

    }

    const pickFrontImage = async () => {
        const asset = await pickImage();
        if (asset) {

            setFront({
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName || 'front.jpg',
            });
        }
    };

    const pickBackImage = async () => {
        const asset = await pickImage();
        if (asset) {
            setBack({
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName || 'back.jpeg',
            });
        }
    };

    const getMimeType = (filename) => {
        const extension = filename.split('.').pop().toLowerCase();

        switch (extension) {
            case 'jpg':
                return 'image/jpeg';
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
            default:
                return "application/octet-stream";
        }
    };

    const submitInsurace = async () => {
        setLoading(true)
        let form;



        form = new FormData();
        form.append('patient_id', user.patient.id);

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

                form.append(key, value);
            }
        });



        // Only set headers based on presence of file
        const headers = (front?.uri || back?.uri)
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' };



        if (front?.uri && front?.name) {
            const newImageUri = Platform.OS === 'ios' ? front.uri.replace('file://', '') : front.uri;

            form.append("front_image", {
                uri: newImageUri, // keep full uri (with file:// on iOS)
                name: front.name || "front.jpeg",
                type: getMimeType(front.name),
            });

        }

        if (back?.uri && back?.name) {
            const newBackImageUri = Platform.OS === 'ios' ? back.uri.replace('file://', '') : back.uri;

            form.append("back_image", {
                uri: newBackImageUri,
                name: back.name,
                type: getMimeType(back.name),
            });

        }



        try {


            const response = await api.post('/add-insurance', form, { headers });

            const data = response.data;

            setConfirm(true);

        }
        catch (error) {
            const data = error.response.data;

            if (error.response.status === 434)
                Alert.alert("Error adding insurance", "Check all fields in the insurance")

            Alert.alert("Error", error);
        }
        finally {
            setLoading(false);
        }
        // setFormData({});
    }

    const modalConfirm = () => {
        setFormData({});
        setConfirm(false);
        navigation.replace("MyInsurance");

    }

    return (
        <>
            <SafeAreaContainerKeyboardAvoiding screenTitle="Add Insurance" allowedBack={true}>


                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 72 }}>
                    <Card title="Subscriber Details">


                        <FloatingLabelInput
                            label="Subscriber First Name"
                            textChange={(text) => setFormData({ ...formData, first_name: text })}
                            value={formData.first_name}
                            required={true}
                        />

                        <FloatingLabelInput
                            label="Subscriber Last Name"
                            textChange={(text) => setFormData({ ...formData, last_name: text })}
                            value={formData.last_name}
                            required={true}
                        />
                        <FloatingDatePicker
                            label="Date of Birth"
                            textChange={(text) => setFormData({ ...formData, dob: text })}
                            value={formData.dob}
                            required={true}
                        />


                        <RadioInput
                            required={true}
                            label="Relation with Subscriber"
                            options={[

                                { id: '1', name: 'Self' },
                                { id: '2', name: 'Spouse' },
                                { id: '3', name: 'Parent' },
                                { id: '4', name: 'Child' },

                            ]}
                            handleSelect={(item) => setFormData({ ...formData, relation: item })}
                            selectedOption={formData.relation}
                        />




                    </Card>

                    <Card title="Address">
                        <FloatingLabelInput
                            label="Address Line 1"
                            textChange={(text) => setFormData({ ...formData, address_line_1: text })}
                            value={formData.address_line_1}
                        />


                        <FloatingLabelInput
                            label="Address Line 2"
                            textChange={(text) => setFormData({ ...formData, address_line_2: text })}
                            value={formData.address_line_2}
                        />

                        <FloatingLabelInput
                            label="Address Line 3"
                            textChange={(text) => setFormData({ ...formData, address_line_3: text })}
                            value={formData.address_line_3}
                        />

                        <FloatingLabelInput
                            label="City"
                            textChange={(text) => setFormData({ ...formData, city: text })}
                            value={formData.city}
                        />

                        <FloatingLabelInput
                            label="State"
                            textChange={(text) => setFormData({ ...formData, state: text })}
                            value={formData.state}
                        />

                        <FloatingLabelInput
                            label="Zip Code"
                            textChange={(text) => setFormData({ ...formData, zip_code: text })}
                            value={formData.zip_code}
                        />
                    </Card>


                    <Card title="Insurance Details">
                        <FloatingLabelInput
                            label="Member ID"
                            textChange={(text) => setFormData({ ...formData, member_id: text })}
                            value={formData.member_id}
                            required={true}
                        />




                        <RadioInput
                        required={true}
                            label="How Did you get insurance"
                            options={[

                                { id: '1', name: 'Self' },
                                { id: '2', name: 'Employer' },
                                { id: '3', name: 'Medicaid' },
                                { id: '4', name: 'Open enrollment' },
                                { id: '5', name: 'Other' },

                            ]}

                            handleSelect={(item) => setFormData({ ...formData, mode: item })}
                            selectedOption={formData.mode}
                        />


                        <FloatingLabelInput
                            label="Insurance Provider"
                            textChange={(text) => setFormData({ ...formData, insurance_provider: text })}
                            value={formData.insurance_provider}
                            placeholder="Company/organization who gave you insurance, e.g your employer"
                        />
                        <FloatingLabelInput
                            label="Insurance Carrier"
                            required={true}
                            textChange={(text) => setFormData({ ...formData, carrier: text })}
                            value={formData.carrier}
                            placeholder="medicaid,United Healthcare, delta"
                        />
                        <FloatingLabelInput
                            label="Group / Plan Number"
                            textChange={(text) => setFormData({ ...formData, plan_no: text })}
                            value={formData.plan_no}
                        />
                    </Card>


                    <Card title="Insurance Card">
                        <Text style={{ fontFamily: theme.font600, fontSize: 14, marginBottom: 6 }} >Upload Picture of insurance card (Front & Back)</Text>
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
                            }} onPress={pickFrontImage}>

                                {front ? <Image source={{ uri: front.uri }} style={{
                                    width: '100%',  // Use '100%' to fill the parent
                                    height: '100%', // Use '100%' to fill the parent
                                    resizeMode: 'cover',
                                }} /> :

                                    <>
                                        <PhotoIcon color={theme.gray} />
                                        <Text>Upload Front</Text>
                                    </>
                                }

                            </TouchableOpacity>

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

                            }}
                                onPress={pickBackImage}
                            >

                                {back ? <Image source={{ uri: back.uri }} style={{
                                    width: '100%',  // Use '100%' to fill the parent
                                    height: '100%', // Use '100%' to fill the parent
                                    resizeMode: 'cover',
                                }} /> :

                                    <>
                                        <PhotoIcon color={theme.gray} />
                                        <Text>Upload Back</Text>
                                    </>
                                }

                            </TouchableOpacity>

                        </View>
                        <Text style={{ fontFamily: theme.font500, fontSize: 12, }}>(Make sure you upload a dental insurance card, not medical. Your estimates may affect with
                            this)</Text>
                    </Card>

                </ScrollView>


                {loading && <LoadingDotsWithOverlay />}
                <BottomButton handlepress={submitInsurace} value="Save" />

                <BottomModal
                    icon={<CheckCircleIcon size={60} color={theme.success} />}
                    title="Successful"
                    confirmText="Continue"
                    visible={isConfirm}

                    message="Insurance has been added successfully"
                    onConfirm={modalConfirm}
                // onCancel={() => setConfirm(false)}
                />


            </SafeAreaContainerKeyboardAvoiding>

        </>
    )
}

export default AddInsurance;