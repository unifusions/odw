
import { useContext, useState } from "react";
import { Text, View, PixelRatio, Dimensions, TouchableOpacity, TextInput, StyleSheet } from "react-native";


import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContext } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import ListServicesHome from "../components/ListServicesHome";
import { ArrowUpRightIcon, MagnifyingGlassIcon, MapIcon, MapPinIcon } from "react-native-heroicons/outline";
import ListLocationHome from "../components/ListLocationsHome";
export default function HomeScreen() {


    const ratio = Math.max(PixelRatio.getFontScale(), 1.3);
    const { height, width } = Dimensions.get('window');
    const { theme, toggleTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, styles.safeAreaContainer]} >
                <View style={styles.dFlexRow} >
                    <View>

                        <Text style={{ fontSize: 12, color: '#475F73', fontFamily: 'Manrope_700Bold' }}>Location</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MapPinIcon color={"#50E0D4"} style={{ paddingEnd: 8 }} />
                            <Text style={{ fontSize: 16, color: '#4f4f4f', fontFamily: 'Manrope_600SemiBold' }}>Las Vegas</Text>

                        </View>
                    </View>
                    <View>
                        <Text>Emergency</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#CBD5E0", // Light grey border
                    paddingHorizontal: 10,
                    backgroundColor: "#FFF",
                    height: 50,
                    marginBottom: 12
                }}>
                    <MagnifyingGlassIcon size={20} color="#A0AEC0" style={{ marginRight: 8, }} />
                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: 16,
                            color: "#2D3748",
                        }}
                        placeholder="Search"
                        placeholderTextColor="#A0AEC0"

                    // onChangeText={(text) => {
                    //     setQuery(text);
                    //     if (onSearch) onSearch(text);
                    // }}
                    />
                </View>
                <View style={styles.adContainer}>

                </View>
                <View style={styles.dFlexRow}>

                    <TouchableOpacity style={[styles.appointmentCard]} >
                        <Text style={[localStyles.title, styles.font500]}>Book an{"\n"}Appointment</Text>
                        <View style={localStyles.iconContainer}>
                            <ArrowUpRightIcon size={20} color="#5A5A5A" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.compareCard} >
                        <Text style={[localStyles.title, styles.font500]}>Compare{"\n"}Costs</Text>
                        <View style={localStyles.iconContainer}>
                            <ArrowUpRightIcon size={20} color="#5A5A5A" />
                        </View>
                    </TouchableOpacity>

                    {/* <View style={styles.compareCard}>
                        <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 24, lineHeight: 36 }}>Compare Costs</Text>
                    </View> */}
                </View>

                {/* SERVICES */}

                <View style={styles.dFlexRow}>
                    <Text style={styles.sectionHeading}>
                        Services
                    </Text>
                    <Text>See All </Text>


                </View>
                <View>
                    <ListServicesHome />
                </View>

                {/* TOP LOCATIONS */}

                <View style={[styles.dFlexRow, { marginBottom: 16 }]}>
                    <Text style={styles.sectionHeading}>
                        Top Locations
                    </Text>
                    <Text>See All </Text>


                </View>

                <ListLocationHome />

                {/* <View>
                    <Text style={{ color: theme.text, fontFamily: theme.font, fontSize: 20 }}>Hello, Theming!</Text>
                    <Text onPress={toggleTheme} style={{ color: theme.primary, marginTop: 20 }}>Switch Theme</Text>
                    <Text>{height}, {width}</Text>
                </View> */}

            </SafeAreaView>
        </SafeAreaProvider >
    )
}

const { width } = Dimensions.get('window');
const localStyles = StyleSheet.create({

    title: {
        fontSize: 20,
        // fontWeight: "500",
        color: "#000",
    },
    iconContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Light grey circle
        borderRadius: 20,
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
    },
})