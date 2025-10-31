import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    ActivityIndicator,
    Alert,
} from "react-native";
import { ThemeContext, useTheme } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import ErrorDialog from "../../components/ErrorDialog";
import LoadingDots from "../../components/LoadingDots";
import api from "../../services/api";

export default function LoginScreen() {
    // const token =  AsyncStorage.getItem('authToken');
    const { theme } = useTheme();
    const gStyles = getGlobalStyles(theme);
    const navigation = useNavigation();
    const [processing, setProcessing] = useState(false);
    const [email, setEmail] = useState('');
    // const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [errorDialogVisible, setErrorDialogVisible] = useState(false)
    const handleConfirm = () => {
        setErrorDialogVisible(false);
        setMessage(null);
    }
    const handleLogin = async () => {
        setProcessing(true);

        try {


            const response = await api.post('/login', { email });


            if (response.status === 200) {


                let otpDigits = response.data.otp;


                navigation.navigate('AuthOtp', { email, otpDigits: otpDigits });

                setProcessing(false);


            }

            else if (response.status === 400) {
                Alert.alert("400 Error User Not Found");
            }


            else {

                setErrorDialogVisible(true);
                setMessage(response.data?.error);

                setProcessing(false);
            }
            setProcessing(false);


        }
        catch (error) {

            if (error.status === 404) {
                setErrorDialogVisible(true);
                setMessage("User Not Found or Invalid Email ID/Phone");

            }
            else { Alert.alert("Something went wrong. Try again later"); }
            setProcessing(false);

        }



    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: "#fff",
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
            fontFamily: theme.font500
        },


        buttonRegister: {
            borderWidth: 1,
            borderColor: '#475F73',
        },

        buttonLogin: {
            backgroundColor: theme.primary,
            borderColor: '#475F73',
        },
        buttonText: {
            fontFamily: theme.font700,
            // padding: 5
        },
        button: {
            flex: 1,

            alignItems: "center",
            justifyContent: "center",
            height: 49,
            marginHorizontal: 3,

        },

        buttonRow: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
        },


    });


    return (

        <>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.innerContainer}>
                        <View style={{ alignItems: "center", width: "100%" }}>
                            <Image source={require("../../assets/images/odw-logo-icon.png")} style={styles.logo} />
                            <Text style={styles.welcomeText}>Welcome Back!</Text>
                            <Text style={styles.subText}>Use Credentials to access your account</Text>


                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                style={gStyles.textInput}
                                placeholder="Enter Username/Registered Phone Number"
                                placeholderTextColor="#999"
                            />

                        </View>
                        {processing ? <LoadingDots /> :
                            <View style={[styles.buttonRow]} >
                                <TouchableOpacity style={[styles.button, styles.buttonRegister]} onPress={() => navigation.navigate('Register')}>

                                    <Text style={[styles.buttonText]} >Register</Text>

                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={handleLogin}>

                                    <Text style={[styles.buttonText, { color: '#FFF' }]}>Log In</Text>


                                </TouchableOpacity>
                            </View>


                        }

                        {errorDialogVisible &&
                            <ErrorDialog visible={errorDialogVisible}
                                title="Error"
                                message={message}
                                onConfirm={handleConfirm} />}
                    </ScrollView>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
};


