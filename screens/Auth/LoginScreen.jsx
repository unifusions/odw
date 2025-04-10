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
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import { loginUser, registerUser } from "../../services/authservices";
import ErrorDialog from "../../components/ErrorDialog";

const LoginScreen = () => {
    // const token =  AsyncStorage.getItem('authToken');
    const { theme } = useContext(ThemeContext);
    const gStyles = getGlobalStyles(theme);
    const navigation = useNavigation();
    const [processing, setProcessing] = useState(false);
    const [email, setEmail] = useState('');
    const [isConfirmVisible, setConfirmVisible] = useState(false);
    const [message, setMessage] = useState('');
    const handleConfirm = () => {
        setConfirmVisible(false);
        setMessage(null);
    }
    const handleLogin = async () => {
        setProcessing(true);

        const response = await loginUser(email);

        if (response.status === 200) {

            otpDigits = response.data.otp;
            // console.log(response.data);
            navigation.navigate('AuthOtp', { email, otpDigits: otpDigits });
        } else {

            setConfirmVisible(true);
            setMessage(response.data.error);
            // Alert.alert("Error", response.data.error || "Something went wrong!");

        }
        setProcessing(false);

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
            fontWeight: "bold",
            color: "#2d3748",
        },
        subText: {
            fontSize: 14,
            color: "#4a5568",
            marginBottom: 20,
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
            fontFamily: theme.font700
        },
        button: {
            flex: 1,
            paddingVertical: 15,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            height: 49,
            marginHorizontal: 5,

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
                        {processing && <ActivityIndicator size="large" />
                        }
                        <View style={[styles.buttonRow]} >
                            <TouchableOpacity style={[styles.button, styles.buttonRegister]} onPress={() => navigation.navigate('Register')}>
                                <Text style={[styles.buttonText]} >Register</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={handleLogin}>
                                <Text style={[styles.buttonText, { color: '#FFF' }]}>Log In</Text>
                            </TouchableOpacity>
                        </View>


                        <ErrorDialog visible={isConfirmVisible}
                            title="Error"
                            message={message}
                            onConfirm={handleConfirm} />
                    </ScrollView>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
};


export default LoginScreen;