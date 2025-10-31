import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native"
import { ThemeContext } from "../theme/ThemeProvider";

const Cta = ({ title, handlePress }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <TouchableOpacity onPress={handlePress} style={{ flexGrow: 1, alignContent: 'center' }}>
            <View style={{ backgroundColor: '#F97835', alignItems: 'center', padding: 16, borderRadius: 8 }}>
                <Text style={{ color: theme.white, fontFamily: theme.font700, fontSize: 16 }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Cta;

