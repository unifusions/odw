import { useContext } from "react"
import { StyleSheet, Text, View } from "react-native"
import { ThemeContext } from "../theme/ThemeProvider"

const Badge = ({ badgeText, size = false }) => {

    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        small: {
            padding: 6, paddingHorizontal: 6, backgroundColor: theme.blue, alignSelf: 'flex-start', borderRadius: 15
        },

        regular: {
            padding: 8, paddingHorizontal: 12, backgroundColor: theme.blue, alignSelf: 'flex-start', borderRadius: 15
        },

        smallText: { fontFamily: theme.font700, textTransform: "uppercase", letterSpacing: 0.75, color: theme.white, fontSize: 10 },
        regularText: {
            fontFamily: theme.font700, textTransform: "uppercase", letterSpacing: 0.75, color: theme.white, fontSize: 12
        }
    })

    return (
        <View style={size ? styles.small : styles.regular}>
            <Text style={size ? styles.smallText : styles.regularText}>
                {badgeText}
            </Text>
        </View>
    )
}

export default Badge;