import { useNavigation, useNavigationState } from "@react-navigation/native";
import React, { useContext, useRef, useState } from "react";
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
import { ThemeContext, useTheme } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import { useAuth } from "../../context/AuthContext";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";
import ErrorDialog from "../../components/ErrorDialog";

export default function OtpScreen({ route }) {

  const { login, otpValidationError } = useAuth();

  const [loading, setLoading] = useState(false);

  const { email, phone, otpDigits, user, isEmail, loginInput, isRegister} = route.params;
  const otpLength = 6;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const inputRefs = useRef([]);
  const { theme } = useTheme();
  const gStyles = getGlobalStyles(theme);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
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

  
    setLoading(true);
    // console.log(phone);
    login(otp, isEmail, loginInput);
    if (otpValidationError) {
      console.log(otpValidationError);
      // setErrorDialogVisible(true);
    }
    setLoading(false);

  };



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
      fontFamily: theme.font700,
      color: "#2d3748",
      marginBottom: 20,
    },
    info: {
      fontSize: 16,
      fontFamily: theme.font400,
      color: theme.mutedText,
      textAlign:"center"
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
      fontFamily: theme.font500,
      textAlign: "center",
      fontSize: 26,
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>

{console.log(otpDigits)}
        <Text style={styles.title}>Enter Your OTP</Text>
       
          {isRegister && <Text style={styles.info}
          >Registration has been completed successfully. Enter your verification code to continue</Text>}
         
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
        <TouchableOpacity style={gStyles.cta} onPress={handleVerify}>
          <Text style={gStyles.ctaText}>VERIFY</Text>
        </TouchableOpacity>
        {loading && <LoadingDotsWithOverlay />}
        {errorDialogVisible && 
        <ErrorDialog visible={errorDialogVisible}
          title="Error"
          message="Invalid OTP. Please try again"
          onConfirm={() => {
            setErrorDialogVisible(false)
            setOtp(new Array(otpLength).fill(""))
          }} />}


      </View>

      {loading && <LoadingDotsWithOverlay />}
    </KeyboardAvoidingView>
  )
}
