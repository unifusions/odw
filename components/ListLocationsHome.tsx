import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { ThemeContext } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import { BookmarkIcon, StarIcon } from "react-native-heroicons/outline";
import { ClinicLocationServices } from "../services/ClinicLocationServices";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth / 3; // Fits 4 items per row with spacing


export default function ListLocationHome() {



    const [clinics, setClinics] = useState([]);

    useEffect(() => {
        ClinicLocationServices().then(setClinics).catch(console.error);
    }, []);
    const { theme } = useContext(ThemeContext);
    const gStyles = getGlobalStyles(theme);
    const navigation = useNavigation();

    return (
        <>

            {

                clinics.map((item) => (
                    <View key={item.id.toString()} >

                        <TouchableOpacity style={styles.locationItemContainer} onPress={() => navigation.navigate('Calendar', { screen: 'ClinicBooking', params: { clinic: item } })}>
                            <View style={{ height: imageWidth, width: imageWidth, backgroundColor: "green", marginEnd: 18 }}>
                                <Image source={{ uri: "https://placehold.co/100x100.png" }} style={styles.image} />
                            </View>

                            <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
                                <View>
                                    <View style={[styles.locationItemContainer, { justifyContent: "space-between", alignItems: "center", marginBottom: 12 }]}>
                                        <Text style={gStyles.locationTitle} >{item.name}</Text>
                                        <BookmarkIcon />
                                    </View>
                                    <View>
                                        <Text>

                                            {item.branches?.[0]?.address_line_1 ?? "No Address"} {"\n"}
                                            {item.branches?.[0]?.address_line_2 ?? "No Address"}
                                        </Text>
                                    </View>

                                </View>

                                <View style={[styles.locationItemContainer, { justifyContent: "space-between", alignItems: "center" }]}>
                                    <TouchableOpacity style={styles.button}>
                                        <Text style={[styles.buttonText, gStyles.font700, gStyles.textUpperCase]}>
                                            Book Now
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={[styles.locationItemContainer, { alignItems: "center" }]}>
                                        <StarIcon style={{ marginEnd: 2 }} />
                                        <Text style={[gStyles.font400, { fontSize: 12 }]}>4.8</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))
            }
        </>

    )
}



const styles = StyleSheet.create({
    locationItemContainer: {
        flexDirection: "row",
        marginBottom: 16
        // justifyContent: "space-between",

    },
    image: {
        flex: 1, width: undefined, height: undefined,
        resizeMode: 'contain',
    },

    button: {
        // width: "100%",
        height: 35,
        paddingHorizontal: 16,
        backgroundColor: "#49A5D5",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        letterSpacing: 1.2
    }


});