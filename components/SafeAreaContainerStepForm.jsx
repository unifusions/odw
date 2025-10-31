import { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import getGlobalStyles from "../theme/globalStyles";
import { ThemeContext } from "../theme/ThemeProvider";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const SafeAreaContainerStepForm = ({ children, screenTitle, allowedBack = false, step, stepCount, prevStep }) => {
    const { theme } = useContext(ThemeContext)
    const styles = getGlobalStyles(theme);
    const navigation = useNavigation();

    const localStyles = StyleSheet.create({
        title: {
            fontFamily: theme.font700,
            fontSize: 14
        },
        stepIndicator: {
            fontFamily: theme.font500,
            color: theme.mutedText
        }
    });
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[{ flex: 1 }, styles.container, styles.safeAreaContainer]}>
                <View style={[styles.flexRow, { justifyContent: "space-between", paddingBottom: 12, alignItems: "center" }]}>
                    {allowedBack && <>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                            <ChevronLeftIcon size={20} color="#4A4A4A" />
                        </TouchableOpacity>

                    </>}
                    <Text style={localStyles.title} >{screenTitle}</Text>
                   {step ? <Text style={localStyles.stepIndicator}>  {step} of {stepCount} </Text> : <View></View>} 
                </View>

                {children}


            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default SafeAreaContainerStepForm;