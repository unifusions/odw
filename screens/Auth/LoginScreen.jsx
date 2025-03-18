// import { useContext } from "react";
// import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { ThemeContext, ThemeProvider } from "../../theme/ThemeProvider";
// import getGlobalStyles from "../../theme/globalStyles";

// export default function LoginScreen() {

//     const { theme } = useContext(ThemeContext);
//     const gStyles = getGlobalStyles(theme);
//     return (

//         <SafeAreaProvider>
//             <SafeAreaView style={styles.container}>
//                 <View style={{ width:'100%', alignItems:"center" }}>

//                     <Image source={require("../../assets/images/odw-logo-icon.png")} style={styles.logo} />
//                     <Text style={styles.welcomeText}>Welcome Back!</Text>
//                     <Text style={styles.subText}>Use Credentials to access your account</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Enter Username/Registered Phone Number"
//                         placeholderTextColor="#999"
//                     />


//                 </View>
//                 <TouchableOpacity style={styles.button}>
//                     <Text style={styles.buttonText}>Log In</Text>
//                 </TouchableOpacity>
//             </SafeAreaView>
//         </SafeAreaProvider>

//     )
// }

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         justifyContent: "space-between",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         padding:20
//     },
//     flexCenter: {
//         flex: 1,
//         justifyContent: "space-between",

//         backgroundColor: "#fff",
//     },
//     logo: {
//         width: 93,
//         height: 100,
//         marginBottom: 20,
//     },
//     welcomeText: {
//         fontSize: 24,
//         fontWeight: "bold",
//         color: "#2d3748",
//     },
//     subText: {
//         fontSize: 14,
//         color: "#4a5568",
//         marginBottom: 20,
//     },
//     input: {
//         width: "100%",
//         height: 50,
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: 0,
//         paddingHorizontal: 15,
//         justifyContent: "center",
//         alignItems: "center",
//         marginBottom: 20,
//     },
//     button: {
//         width: "100%",
//         height: 50,
//         backgroundColor: "#49A5D5",
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "bold",
//     },
// });

import React from "react";
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

const LoginScreen = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.innerContainer}>
                    <View style={{ alignItems:"center", width:"100%" }}>
                        <Image source={require("../../assets/images/odw-logo-icon.png")} style={styles.logo} />
                        <Text style={styles.welcomeText}>Welcome Back!</Text>
                        <Text style={styles.subText}>Use Credentials to access your account</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Username/Registered Phone Number"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

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
        marginTop:40,
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
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#49A5D5",
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

export default LoginScreen;