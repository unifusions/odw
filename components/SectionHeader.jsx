import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function SectionHeader({ sectionTitle = '', handlePress, touchableText = '' }) {

    const { theme } = useTheme();
    const styles = StyleSheet.create({
        sectionContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12

        },

        sectionHeading: {
            color: theme.primary,
            fontSize: 21,
            fontFamily: theme.font600
        },

        touchableText: {
            fontSize: 14,
            fontFamily: theme.font400
        }
    })
    return (
        <>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeading}>
                    {sectionTitle}
                </Text>
                {
                    handlePress && <TouchableOpacity onPress={handlePress}>
                        <Text style={styles.touchableText}>{touchableText}</Text>
                    </TouchableOpacity>
                }
            </View>
        </>
    )
}