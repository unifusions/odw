import { useContext } from "react"
import { Text, View } from "react-native"
import { ThemeContext } from "../theme/ThemeProvider"

const Badge = ({ badgeText }) => {

    const { theme } = useContext(ThemeContext);

    return (
        <View style={{ padding: 8, paddingHorizontal: 12, backgroundColor: theme.blue, alignSelf: 'flex-start', borderRadius: 15, marginBottom: 8 }}>
            <Text style={{ fontFamily: theme.font700, textTransform: "uppercase", letterSpacing: 0.75, color: theme.white, fontSize:12 }}>
                {badgeText} | cateogry
            </Text>
        </View>
    )
}

export default Badge;