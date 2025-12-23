import { Text, View, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";



export default function UpdateApp() {
    const { theme } = useTheme();
    const styles = getGlobalStyles(theme);
    return (
        <>

            <SafeAreaProvider>
                <SafeAreaView style={[{ flex: 1 }, styles.container, styles.safeAreaContainer]}>
                    <View style={{ alignItems: "center", width: "100%" }}>
                        <Image source={require("../assets/images/odw-logo-icon.png")} style={{
                            width: 93,
                            height: 100,
                            marginTop: 40,
                            marginBottom: 40,
                        }} />

                        <Text style={{ marginTop: 20, fontFamily: theme.font500, fontSize: 16, color: theme.textPrimary, marginBottom: 20 }}>
                            App Update Required. Kindly Update

                            
                        </Text>

                    </View>
                </SafeAreaView>
            </SafeAreaProvider>

        </>
    )
}
