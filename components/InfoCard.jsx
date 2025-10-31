import { useContext } from "react"
import { View, Text } from "react-native"
import { ThemeContext } from "../theme/ThemeProvider"
import getGlobalStyles from "../theme/globalStyles";

const InfoCard = ({ title, children }) => {
    const { theme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    return (
        <View style={ styles.infoCard }>
            <Text style={styles.cardTitle}>{title}</Text>

            <View style={{ backgroundColor:theme.white, padding:10, borderRadius: 10}}>
            {children}

            </View>
        </View>
    )
} 

export default InfoCard;