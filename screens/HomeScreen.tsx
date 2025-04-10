
import { useContext, useEffect, useState } from "react";
import { Text, View, PixelRatio, Dimensions, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from "react-native";


import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeContext } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import ListServicesHome from "../components/ListServicesHome";
import { ArrowUpRightIcon, MagnifyingGlassIcon, MapIcon, MapPinIcon } from "react-native-heroicons/outline";
import ListLocationHome from "../components/ListLocationsHome";
import { useNavigation } from "@react-navigation/native";
import getLocation from "../services/getLocation";
import DealsCarousel from "../components/DealsCarousel";

export default function HomeScreen() {


    const navigation = useNavigation();
    const ratio = Math.max(PixelRatio.getFontScale(), 1.3);
    const { height, width } = Dimensions.get('window');
    const { theme, toggleTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);

    const [location, setLocation] = useState(null);
    const [city, setCity] = useState("Fetching...");

    useEffect(() => {
        fetchLocation();
    }, []);

    const fetchLocation = async () => {
        try {
            const loc = await getLocation.getLocation();
            setLocation(loc);

            const cityName = await getLocation.getCityName(loc.coords.latitude, loc.coords.longitude);
            setCity(cityName);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, styles.safeAreaContainer]} >
                <ScrollView showsVerticalScrollIndicator={false}>


                    <View style={styles.dFlexRow} >
                        <View>

                            <Text style={{ fontSize: 12, color: '#475F73', fontFamily: 'Manrope_700Bold' }}>Location</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <MapPinIcon color={"#50E0D4"} style={{ paddingEnd: 8 }} />
                                <Text style={{ fontSize: 16, color: '#4f4f4f', fontFamily: 'Manrope_600SemiBold' }}>{city}</Text>

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
                    <DealsCarousel />
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

                        <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'AllServices' })}>
                            <Text>See All </Text>
                        </TouchableOpacity>



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

                </ScrollView>
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