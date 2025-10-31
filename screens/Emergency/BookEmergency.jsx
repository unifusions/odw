import { StyleSheet, Text, View, Linking, TouchableOpacity, Alert } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { useTheme } from "../../theme/ThemeProvider";
import Card from "../../components/Card";
import { PhoneArrowUpRightIcon } from "react-native-heroicons/outline";
import useSettings from "../../hooks/useSettings";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";


export default function BookEmergency() {


    const { theme } = useTheme();
    const { settings, loading } = useSettings();
    const emergency_dial = settings?.settings?.find(item => item.key === "emergency_dial")
    const styles = StyleSheet.create(

        {
            text: {
                fontFamily: theme.font400,
                marginBottom: 16
            },
            infoTitle: {
                fontFamily: theme.font700, fontSize: 16,
                marginBottom: 6
            },
            info: {
                fontFamily: theme.font400, fontSize: 16, color: theme.primary
            },
        })

    const handleCall = async () => {
        // const url = `tel:${settings?.settings?.find(item => item.key === "emergency_dial")}`;
        const url = `tel:+17029975057`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Error', 'Phone calls are not supported on this device.');
        }
    };

    return (
        <>
            <SafeAreaContainer
                screenTitle="Book An Emergency"
                allowedBack={true}
            >
                <View>
                    <Text style={styles.text}>
                        Emergency dental appointments may have an emergency fee which is not covered by most
                        dental insurance
                    </Text>
                </View>

                <Card>
                    <TouchableOpacity onPress={handleCall}>
                        <View style={{ flexDirection: "row", marginVertical: 16, alignItems: "center" }}>
                            <PhoneArrowUpRightIcon color={theme.blue} style={{ marginEnd: 16 }} size={40} />
                            <View >
                                <Text style={styles.infoTitle}>Call Our Emergency Care</Text>
                                <Text style={styles.info}> {emergency_dial && emergency_dial?.value}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </Card>
                {loading && <LoadingDotsWithOverlay />}
            </SafeAreaContainer>
        </>
    )
}