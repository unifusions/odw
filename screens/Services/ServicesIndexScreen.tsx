import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import ScreenHeader from "../../components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";

export default function ServicesIndexScreen() {

    const navigation = useNavigation();
    const theme = ThemeContext;
    const gStyles = getGlobalStyles(theme);
    return (
        <SafeAreaProvider>
            <SafeAreaView style={gStyles.safeAreaContainer}>
                <ScreenHeader title="All Dental Services"
                    onBackPress={() => navigation.goBack()} />
                <View style={localStyles.container}>
                    <Text>ok</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
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