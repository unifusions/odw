import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { registerUser } from "../../services/authservices";

const RegisterScreen = () => {
    const { theme } = useContext(ThemeContext);
    const gStyles = getGlobalStyles(theme);
    const navigation = useNavigation();
    
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');

    const [otpDigits, setOtpDigits] = useState();
    const [processing, setProcessing] = useState(false);
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            backgroundColor: "#fff",
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
            fontWeight: "bold",
            color: "#2d3748",
            marginBottom: 12
        },
        subText: {
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
            // fontFamily: theme.font700,
            backgroundColor: theme.primary,
            // borderColor: '#475F73',
            width: '100%'
        },
        buttonText: {
            fontFamily: theme.font700,
            color: theme.white
        },
    })


    const handleRegister = async () => {


     
        setProcessing(true);

        const response = await registerUser(email, phone, fullname);

        if (response && response.status === 200) {
            console.log(response.data);
            navigation.navigate('AuthOtp', { email, phone,fullname, otpDigits: response.data.otp });
        } else {

            setConfirmVisible(true);
            setMessage(response.data.error?.toString() || "Something went wrong!");


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

                    <View>
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <TextInput
                            value={fullname}
                            onChangeText={setFullname}
                            style={gStyles.textInput}
                            placeholder="Enter Username/Registered Phone Number"
                            placeholderTextColor="#999"
                        />

                    </View>



                    <View>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={gStyles.textInput}
                            placeholder="Email"
                            placeholderTextColor="#999"
                        />
                    </View>



                    <View>
                        <Text style={styles.inputLabel}>Phone Number</Text>
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            style={gStyles.textInput}
                            placeholder="Phone Number"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                        />
                    </View>




                </View>
                <TouchableOpacity style={[styles.button]} onPress={handleRegister}>
                    <Text style={[styles.buttonText]} >Register</Text>
                </TouchableOpacity>
            </ScrollView>

        </KeyboardAvoidingView>


    )
}

export default RegisterScreen;