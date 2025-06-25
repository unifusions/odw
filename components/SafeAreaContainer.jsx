import { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import getGlobalStyles from "../theme/globalStyles";
import { ThemeContext } from "../theme/ThemeProvider";
import { Text, TouchableOpacity, View } from "react-native";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const SafeAreaContainer = ({ children, screenTitle, allowedBack = false }) => {
    const { theme } = useContext(ThemeContext)
    const styles = getGlobalStyles(theme);
    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[{ flex: 1 }, styles.container, styles.safeAreaContainer]}>
                <View style={[styles.flexRow, { alignItems: "center", paddingBottom: 12, }]}>
                    {allowedBack && <>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                            <ChevronLeftIcon size={22} color="#4A4A4A" />
                        </TouchableOpacity>

                    </>}
                    <Text style={styles.stepFormScreenTitle}>{screenTitle}</Text>

                </View>

                {children}
            
            
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default SafeAreaContainer;