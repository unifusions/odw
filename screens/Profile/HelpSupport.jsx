import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
 import getGlobalStyles from "../../theme/globalStyles";
import { ThemeContext } from "../../theme/ThemeProvider";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { EnvelopeIcon, PhoneArrowUpRightIcon } from "react-native-heroicons/outline";
import Card from "../../components/Card";
import { ExclamationCircleIcon } from "react-native-heroicons/solid";

const HelpSupport = () => {
    const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    const localStyles = StyleSheet.create({
        infoTitle: {
            fontFamily: theme.font700, fontSize: 16,
            marginBottom: 6
        },
        info: {
            fontFamily: theme.font400, fontSize: 16, color: theme.primary
        },
        emergency: {
            fontFamily: theme.font700,
            fontSize: 16,
            color: theme.amber,
            marginBottom: 6,
        },

        emergencyText: {
            fontFamily: theme.font500,
            fontSize: 16,

        }
    });
    return (
        <SafeAreaContainer
            screenTitle="Help & Support"
            allowedBack={true}
            
        >
            <View style={{  marginBottom: 16 }}>
                <Text style={styles.screenTitle}>
                    Need help? 

                </Text>
                <Text style={styles.screenSubTitle}>Our team is here for you.</Text>
            </View>

            <Card>
                <View style={{ flexDirection: "row", marginVertical: 16, alignItems: "center" }}>
                    <EnvelopeIcon color={theme.blue} style={{ marginEnd: 16 }} size={40} />
                    <View>
                        <Text style={localStyles.infoTitle}>Email Support</Text>
                        <Text style={localStyles.info}>admin@onedentalworld.com</Text>
                    </View>
                </View>
            </Card>


            <Card>
                <View style={{ flexDirection: "row", marginVertical: 16, alignItems: "center" }}>
                    <PhoneArrowUpRightIcon color={theme.blue} style={{ marginEnd: 16 }} size={40} />
                    <View >
                        <Text style={localStyles.infoTitle}>Call Support</Text>
                        <Text style={localStyles.info}>+1 (702) 997-5057</Text>
                    </View>
                </View>
            </Card>

            <View style={{ backgroundColor: theme.amber50, padding: 8, borderRadius: 24 }}>

                <View style={{ flexDirection: "row", marginVertical: 16, alignItems: "top" }}>
                    <ExclamationCircleIcon color={theme.amber} size={40} style={{ marginEnd: 16 }} />
                    <View style={{ flex: 1 }}>
                        <Text style={localStyles.emergency}>Emergency</Text>
                        <Text style={[localStyles.info, { flexWrap: "wrap" }]}>For dental emergencies, please contact your nearest clinic directly or
                            dial local emergency services.
                        </Text>
                    </View>

                </View>
            </View>
             
        </SafeAreaContainer>

    )
}

export default HelpSupport;