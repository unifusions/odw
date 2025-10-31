
import { useEffect, useState } from "react";
import { Text, View, Dimensions, StyleSheet, ScrollView, Alert } from "react-native";


import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import ListServicesHome from "../components/ListServicesHome";
import { MapPinIcon } from "react-native-heroicons/outline";
import ListLocationHome from "../components/ListLocationsHome";
import { useNavigation } from "@react-navigation/native";
import getLocation from "../services/getLocation";
import DealsCarousel from "../components/DealsCarousel";
import HomeCard from "./Home/HomeCard";
import EmergencyButton from "./Emergency/EmergencyButton";
import DentistsSection from "./Home/DentistsSection";

import SpecialistSection from "./Home/SpecialistSection";

 

export default function HomeScreen() {


    const navigation = useNavigation();

    const { theme } = useTheme();
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

                        <View style={styles.dFlexRow}>

                            <View>
                                <Text style={{ fontSize: 12, color: '#475F73', fontFamily: 'Manrope_700Bold' }}>Location</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <MapPinIcon color={"#50E0D4"} style={{ paddingEnd: 8 }} />
                                    <Text style={{ fontSize: 16, color: '#4f4f4f', fontFamily: 'Manrope_600SemiBold' }}>{city}</Text>

                                </View>
                            </View>

                        </View>
                        <EmergencyButton handlePress={() => navigation.navigate('Emergency')} />

                    </View>

                    <DealsCarousel />
                    <HomeCard navigation={navigation} />


                    {/* SERVICES */}
                    <ListServicesHome />


                    {/* TOP LOCATIONS */}




                    <ListLocationHome location={location} />


                    <SpecialistSection />


                    {/* TOP DENTISTS */}




                    <DentistsSection />



                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider >
    )
}

