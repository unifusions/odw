import { useContext } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import getGlobalStyles from "../../theme/globalStyles";
import { ThemeContext } from "../../theme/ThemeProvider";
import SafeAreaContainer from "../../components/SafeAreaContainer";

const MyEstimates = () => {
    const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    return (
        <SafeAreaContainer 
            screenTitle="Estimates"
        >

        </SafeAreaContainer>

    )
}

export default MyEstimates;