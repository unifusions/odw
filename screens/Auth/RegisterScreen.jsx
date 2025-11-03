import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ThemeContext, useTheme } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { registerUser } from "../../services/authservices";
import BottomSheetDialog from "../../components/BottomSheetDialog";
import ModalDialog from "../../components/ModalDialog";
import BottomButton from "../../components/BottomButton";
import Card from "../../components/Card";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import LoadingDots from "../../components/LoadingDots";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";
import PhoneInput from "../../components/PhoneInput";

const RegisterScreen = () => {
    const { theme } = useTheme();
    const gStyles = getGlobalStyles(theme);
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState({ value: '', isValid: false });

    const [otpDigits, setOtpDigits] = useState();
    const [processing, setProcessing] = useState(false);

    const [confirmVisible, setConfirmVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("Oops");
    const [modalMessage, setModalMessage] = useState("Something went wrong. Please try again later");

    const [errors, setErrors] = useState({
        fullname : {},
        email : {}
    })
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            // backgroundColor: "#fff",
        },
        inputLabel: {
            fontFamily: theme.font700,
            textAlign: 'left',
            alignItems: "flex-start",
        },
        innerContainer: {
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 40
        },
        logo: {
            width: 93,
            height: 100,
            marginTop: 40,
            marginBottom: 20,
        },
        welcomeText: {
            fontSize: 24,
            fontFamily: theme.font700, color: "#2d3748",
            marginBottom: 12
        },
        subText: {
            fontFamily: theme.font400,
            fontSize: 14,
            color: "#4a5568",
            marginBottom: 20,
        },
        button: {
            // flex: 1,
            paddingVertical: 15,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            height: 49,
            marginHorizontal: 5,

            backgroundColor: theme.primary,

            width: '100%'
        },
        buttonText: {
            fontFamily: theme.font700,
            color: theme.white
        },
    })


    const handleRegister = async () => {

     
        setProcessing(true);

        try {
            const response = await registerUser(email, phone, fullname);

            if (response.status === 200) {

                navigation.navigate('AuthOtp', { email, phone, fullname, otpDigits: response.data.otp });

            }
            else if (response.status === 400) {
                console.log(response.data)
            }
            else {
                if (response.status === 409) {
                    setModalTitle("User Already Registered");
                    setModalMessage("User already registered. Login to continue")
                }

                setConfirmVisible(true);
                setModalMessage(response.data.error?.toString() || "Something went wrong!");

            }
        }

        catch (error) {
            console.log(error)
        }

        setProcessing(false);

    }

    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <ScrollView contentContainerStyle={styles.innerContainer}>

                <View style={{ width: "100%" }}>
                    <View style={{ alignItems: "center", }}>
                        <Image source={require("../../assets/images/odw-logo-icon.png")} style={styles.logo} />
                        <Text style={styles.welcomeText}>Register</Text>
                        <Text style={styles.subText}>Enter Your Information Below</Text>
                    </View>

                    <Card>
                        <View style={{ marginVertical: 8 }}>

                            <FloatingLabelInput
                                label="Full Name"
                                textChange={(text) => setFullname(text)}
                                value={fullname}
                                required={true}

                            />

                            <FloatingLabelInput
                                label="Email"
                                textChange={(text) => setEmail(text)}
                                value={email}
                                keyboardType="email-address"
                                required={true}
                            />



                            <PhoneInput
                                label="Valid Phone"
                                value={phone.value}
                                onChange={(data) => setPhone(data)}
                                required={true}

                            />



                        </View>


                    </Card>


                    <TouchableOpacity style={[styles.button]} onPress={handleRegister}>
                        <Text style={[styles.buttonText]} >Register</Text>
                    </TouchableOpacity>



                </View>

                {processing && <LoadingDotsWithOverlay />


                }



                {/* <TouchableOpacity style={[styles.button]} onPress={handleRegister}>
                    <Text style={[styles.buttonText]} >Register</Text>
                </TouchableOpacity> */}
            </ScrollView>


            <ModalDialog
                visible={confirmVisible}
                title={modalTitle}
                message={modalMessage}
                onConfirm={() => navigation.navigate('Login')}
                onCancel={() => setConfirmVisible(false)}
            />

        </KeyboardAvoidingView>


    )
}

export default RegisterScreen;