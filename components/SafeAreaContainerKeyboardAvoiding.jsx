import { useContext } from "react";
import getGlobalStyles from "../theme/globalStyles";
import { ThemeContext } from "../theme/ThemeProvider";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SafeAreaContainer from "./SafeAreaContainer";

const SafeAreaContainerKeyboardAvoiding = ({ children, screenTitle, allowedBack = false }) => {
    const { theme } = useContext(ThemeContext)
    const styles = getGlobalStyles(theme);
    const navigation = useNavigation();
    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <SafeAreaContainer screenTitle={screenTitle} allowedBack={true}>
                    <>


                        {children}


                    </>

                </SafeAreaContainer>


            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SafeAreaContainerKeyboardAvoiding;