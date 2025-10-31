import { useContext, useEffect, useState } from "react";


import { ThemeContext, useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import getGlobalStyles from "../../theme/globalStyles";

import { PencilIcon } from "react-native-heroicons/outline";
import { View, TouchableOpacity, Image, StyleSheet, Text, ScrollView, Alert } from "react-native";

import { AuthContext, useAuth } from "../../context/AuthContext";

import Card from "../../components/Card";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import SafeAreaContainerKeyboardAvoiding from "../../components/SafeAreaContainerKeyboardAvoiding";
import RadioInput from "../../components/RadioInput";
import FloatingDatePicker from "../../components/FloatingDatePicker";
import BottomButton from "../../components/BottomButton";
import * as ImagePicker from 'expo-image-picker';
import api from "../../services/api";
import { format, parse, set } from "date-fns";
import { Platform } from 'react-native';
import { APP_URL } from "../../config";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";


export default function EditProfileScreen() {
    const { user, patient, setPatient } = useAuth();
    
    const { theme } = useTheme();

    const [imageData, setImageData] = useState(null); // holds new image object

    const changeDateFormat = ({ dateString }) => {
        const dateObject = new Date(dateString);
        return format(dateObject, 'm/d/yyyy')
    }

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        first_name: patient.first_name || "",
        middle_name: patient.middle_name || "",
        last_name: patient.last_name || "",
        phone: patient.phone_number || "",
        email: user.email || "",
        dob: patient.dob || null,
        gender: '',
        avatar: patient.avatar || null,
        avatarImage: null,
    });

    const handleChooseImage = () => {
        ImagePicker.launchImageLibrary(
            { mediaType: 'photo', quality: 0.8 },
            (response) => {
                if (response.didCancel || response.errorCode) return;

                const asset = response.assets[0];
                setImageData({
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName || 'profile.jpg',
                });
            }
        );
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        });
        if (!result.canceled) {
            // setFormData({ ...formData, avatarImage: result.assets[0] });
            const asset = result.assets[0];
            setImageData({
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName || 'profile.jpg',
            });
        }
    }

    const handleDateConfirm = (selectedDate) => {
        setDate(selectedDate);
        setFormData({ ...formData, dob: selectedDate.toISOString().split("T")[0] });
        setOpenDatePicker(false);
    };

    useEffect(() => {

    }, [])

    const getMimeType = (filename) => {
        const extension = filename.split('.').pop().toLowerCase();
        switch (extension) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            case 'gif':
                return 'image/gif';
            default:
                return 'image/jpeg'; // Fallback
        }
    };

    

    const submitForm = async () => {


        let form;
        let headers;

        setLoading(true)
        if (imageData) {

            const newImageUri = Platform.OS === 'ios' ? imageData.uri.replace('file://', '') : imageData.uri;
            form = new FormData();
            form.append('patient_id', user.patient.id);
            form.append('first_name', formData.first_name);
            form.append('middle_name', formData.middle_name);
            form.append('last_name', formData.last_name);
            form.append('phone', formData.phone);
            form.append('email', formData.email);
            form.append('dob', formData.dob);
            form.append('gender', formData.gender);
            form.append('gender', formData.gender);
            form.append('avatar', formData.avatar);
            form.append('image', {
                uri: newImageUri,
                name: imageData.name,
                type: getMimeType(imageData.name),
            });

            
            headers = {
                'Content-Type': 'multipart/form-data',
            };
          

        }
        else {
            form = new FormData();
            form.append('patient_id', user.patient.id);
            form.append('first_name', formData.first_name);
            form.append('middle_name', formData.middle_name);
            form.append('last_name', formData.last_name);
            form.append('phone', formData.phone);
            form.append('email', formData.email);
            form.append('dob', formData.dob);
            form.append('gender', formData.gender);
            form.append('gender', formData.gender);
            form.append('avatar', formData.avatar);

            headers = {
                'Content-Type': 'application/json',
            };

        }

        
    
        try {
            const response = await api.post('/update-profile', form, {headers} );


            const data = await response.data;
             
            if (response.data) {
                setPatient(data.patient);
                Alert.alert('Profile Updated Successfully!');
            } else {
                console.error(data);
                Alert.alert('Upload failed', data.message || 'Error occurred');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error uploading');
        }
        finally{
            setLoading(false)
        }


    }

    return (
        <>
            <SafeAreaContainerKeyboardAvoiding
                screenTitle='Edit Profile'
                allowedBack={true}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 72 }}>


                    <View style={localStyles.imageContainer}>
                        <TouchableOpacity style={localStyles.profileImage} onPress={pickImage}>
                        <Image source={imageData ? { uri: imageData.uri } : { uri: APP_URL + '/storage/' + user.patient.avatar }} style={localStyles.profileImage} />
                            
                            <View style={localStyles.editButton}>
                                <PencilIcon size={18} color="white" />
                            </View>

                        </TouchableOpacity>
                     
  



                    </View>

                    <Card title="Personal Information">

                        <FloatingLabelInput
                            label="First Name"
                            textChange={(text) => setFormData({ ...formData, first_name: text })}
                            value={formData.first_name}
                            
                        />

                        <FloatingLabelInput
                            label="Last Name"
                            textChange={(text) => setFormData({ ...formData, last_name: text })}
                            value={formData.last_name}

                        />



                        <FloatingDatePicker
                            label="Date of Birth"
                            textChange={(text) => setFormData({ ...formData, dob: text })}
                            value={formData.dob}
                        />

                        <RadioInput
                            label="Gender"
                            options={[
                                { id: '1', name: 'Male' },
                                { id: '2', name: 'Female' },
                                { id: '3', name: 'Others' }
                            ]}
                            handleSelect={(item) => setFormData({ ...formData, gender: item })}
                            // handleSelect={(item) => console.log(item)}
                            selectedOption={formData.gender}
                        />






                    </Card>

                    <Card title="Contact Information">



                        <FloatingLabelInput
                            label="Phone"
                            textChange={(text) => setFormData({ ...formData, phone: text })}
                            value={formData.phone}
                            keyboardType="number-pad"

                        />

                        <FloatingLabelInput
                            label="E-Mail"
                            textChange={(text) => setFormData({ ...formData, email: text })}
                            value={formData.email}
                            keyboardType="email-address"

                        />



                    </Card>






                </ScrollView>


{loading && <LoadingDotsWithOverlay />}

                <BottomButton handlepress={submitForm} value="Save"
                    buttonTheme="primary"
                />

            </SafeAreaContainerKeyboardAvoiding>
        </>
    )
}


const localStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
        flex: 1,
    },
    imageContainer: {
        position: "relative",
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#F1F1F1",
    },
    editButton: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: "#1E293B",
        padding: 6,
        borderRadius: 20,
    },

    input: {
        width: "100%",
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        marginBottom: 10,
        backgroundColor: "#F7F7F7",
    },
    inputIconContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        backgroundColor: "#F7F7F7",
        marginBottom: 10,
    },
    inputIcon: {
        flex: 1,
        marginLeft: 10,
    },
    dateText: {
        flex: 1,
        marginLeft: 10,
        color: "#9E9E9E",
    },
});