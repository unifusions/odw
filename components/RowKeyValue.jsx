import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function RowKeyValue({ borderBelow = true, label, value }) {
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        infoContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8
        },
        text: {
            fontSize: 14,
            fontFamily: theme.font400
        },
        bold: {
            fontFamily: theme.font600
        },

        borderBelow: {
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
    });
    return (
        <View style={[styles.infoContainer, borderBelow && styles.borderBelow]}>
            <Text style={[styles.text]}>
                {label}
            </Text>
            <Text style={[styles.text, styles.bold]}>
                {value}
            </Text>

        </View>
    )
}