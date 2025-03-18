
import { useContext, useState } from "react";
import { Text, View, PixelRatio, Dimensions, TouchableOpacity } from "react-native";


import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContext } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import ListServicesHome from "../components/ListServicesHome";
export default function HomeScreen() {


    const ratio = Math.max(PixelRatio.getFontScale(), 1.3);
    const { height, width } = Dimensions.get('window');
    const { theme, toggleTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} >
                <View style={styles.dFlexRow} >
                    <View>
                        <Text style={{ fontSize: 12 * ratio, color: '#475F73', fontFamily: 'Manrope_700Bold' }}>Location</Text>
                        <Text style={{ fontSize: 16 * ratio, color: '#4f4f4f', fontFamily: 'Manrope_600SemiBold' }}>Las Vegas</Text>
                    </View>
                    <View>
                        <Text>Emergency</Text>
                    </View>
                </View>

                <View style={styles.dFlexRow}>
                    <Text>Search</Text>
                </View>

                <View style={styles.adContainer}>

                </View>
                <View style={styles.dFlexRow}>
                    <View style={styles.appointmentCard}>
                        <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 24, lineHeight: 36 }}>Book an Appointment</Text>
                    </View>

                    <View style={styles.compareCard}>
                        <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 24, lineHeight: 36 }}>Compare Costs</Text>
                    </View>
                </View>

                {/* SERVICES */}

                <View style={styles.dFlexRow}>
                    <Text style={styles.sectionHeading}>
                        Services
                    </Text>
                    <Text>See All </Text>


                </View>
                <View>
                    <ListServicesHome  />
                </View>

                {/* <View>
                    <Text style={{ color: theme.text, fontFamily: theme.font, fontSize: 20 }}>Hello, Theming!</Text>
                    <Text onPress={toggleTheme} style={{ color: theme.primary, marginTop: 20 }}>Switch Theme</Text>
                    <Text>{height}, {width}</Text>
                </View> */}

            </SafeAreaView>
        </SafeAreaProvider>
    )
}