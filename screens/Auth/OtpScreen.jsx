import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
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
} from "react-native";


export default function OtpScreen(second) {

    const otpLength = 6;
    const [otp, setOtp] = useState(new Array(otpLength).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (value, index) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if filled
        if (value !== "" && index < otpLength - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (event, index) => {
        if (event.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
            inputRefs.current[index - 1].focus();
        }
    };
    const handleVerify = () => {
        // Navigate to Bottom Tab and Reset Stack
        navigation.reset({
          index: 0,
          routes: [{ name: "BottomTabs" }], // Ensure this matches the name in your navigator
        });
      };
    

    const navigation = useNavigation();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Text style={styles.title}>Enter Your OTP</Text>
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        value={digit}
                        onChangeText={(value) => handleChange(value, index)}
                        onKeyPress={(event) => handleKeyPress(event, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                    />
                ))}
            </View>
            <TouchableOpacity style={styles.button}  onPress={handleVerify}>
                <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#2d3748",
      marginBottom: 20,
    },
    otpContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
    otpInput: {
      width: 50,
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      
      textAlign: "center",
      fontSize: 20,
      marginHorizontal: 5,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: "#38BDF8",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });