import { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import getGlobalStyles from "../theme/globalStyles";
import { ThemeContext } from "../theme/ThemeProvider";
import { Text } from "react-native";

const SafeAreaContainer = ({ children, screenTitle }) => {
    const { theme } = useContext(ThemeContext)
    const styles = getGlobalStyles(theme);
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[{ flex: 1 }, styles.container, styles.safeAreaContainer]}>

                <Text style={styles.stepFormScreenTitle}>{screenTitle}</Text>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default SafeAreaContainer;