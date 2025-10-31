import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ExclamationTriangleIcon } from "react-native-heroicons/outline";
import { ThemeContext } from "../../theme/ThemeProvider";

export default function EmergencyButton({ handlePress }) {
    const { theme } = useContext(ThemeContext);
    return (
        <>
            <TouchableOpacity onPress={handlePress}>
                <View style={{ backgroundColor: theme.danger, padding: 8, flexDirection: "row", alignItems: "center" }} >
                    <ExclamationTriangleIcon color={theme.white} />
                    <Text style={{ marginStart: 8, color: theme.white }}>Urgent Dental</Text>
                </View>

            </TouchableOpacity>
        </>
    )
}