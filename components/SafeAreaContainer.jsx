import { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import getGlobalStyles from "../theme/globalStyles";
import { ThemeContext } from "../theme/ThemeProvider";
import { Text, TouchableOpacity, View } from "react-native";
import {   ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import LoadingDotsWithOverlay from "./LoadingDotsWithOverlay";

const SafeAreaContainer = ({ children, screenTitle, allowedBack = false, 
    loading=false }) => {
    const { theme } = useContext(ThemeContext)
    const styles = getGlobalStyles(theme);
    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[{ flex: 1 }, styles.container, styles.safeAreaContainer]}>

                {screenTitle && <View style={[styles.flexRow, { alignItems: "center", marginBottom: 20, }]}>
                    {allowedBack && <>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                            <ChevronLeftIcon size={16} color="#4A4A4A" />
                        </TouchableOpacity>

                    </>}
                    <Text style={{
                        fontFamily: theme.font700,
                        fontSize: 14
                    }}>{screenTitle}</Text>

                </View>
                }


                {children}


                {loading && <LoadingDotsWithOverlay />}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default SafeAreaContainer;