import { useContext } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from "react-native";
import { ThemeContext } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import { MapPinIcon } from "react-native-heroicons/outline";

import { useNavigation } from "@react-navigation/native";

import { getDistanceFromLatLonInKm, getDistanceFromLatLonInMiles } from "../services/getDistanceInMiles";
import LocationHomeSkeleton from "./home/skeleton/LocationItemSkeleton";
import useClinics from "../hooks/useClinics";
import SectionHeader from "./SectionHeader";

const screenWidth = Dimensions.get("window").width;
const imageWidth = screenWidth / 3; // Fits 4 items per row with spacing


export default function ListLocationHome({ location }) {


    const { clinics, loading, errors } = useClinics();

    const fallBackUrl = "https://placehold.co/600x400.png";


    const { theme } = useContext(ThemeContext);
    const gStyles = getGlobalStyles(theme);
    const navigation = useNavigation();

    return (
        <>

            {loading ? <LocationHomeSkeleton /> : <>

                <SectionHeader
                    sectionTitle="Top Locations"
                    touchableText="See All"

                />

                {clinics.map((item) => (
                    <View key={item.id.toString()} >

                        <TouchableOpacity style={styles.locationItemContainer} onPress={() => navigation.navigate('Home', {
                            screen: 'ShowClinic', params: {
                                clinic: item,
                                distance: getDistanceFromLatLonInMiles(
                                    location?.coords?.latitude,
                                    location?.coords?.longitude,
                                    item?.latitude || 36.08919605220297,
                                    item?.longitude || -115.29800364735779
                                ).toFixed(2)
                            }
                        })}>

                            <View style={{ height: imageWidth, width: imageWidth, marginEnd: 18 }}>

                                <Image source={{ uri: item.logo_url ?? fallBackUrl }} style={styles.image} />

                            </View>

                            <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                                    <Text style={gStyles.locationTitle} >{item.name}</Text>
                                    {/* <BookmarkIcon /> */}
                                </View>




                                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 6 }}>
                                    <MapPinIcon size={16} />
                                    <Text style={{ fontFamily: theme.font500, fontSize: 14 }}>


                                        {getDistanceFromLatLonInMiles(
                                            location?.coords?.latitude,
                                            location?.coords?.longitude,
                                            item?.latitude || 36.08919605220297,
                                            item?.longitude || -115.29800364735779

                                        ).toFixed(2)} miles





                                    </Text>
                                </View>

                                <View>

                                    {item?.address_line_1 && <Text style={{ fontFamily: theme.font400, fontSize: 14 }}>{item?.address_line_1}</Text>}
                                    {item?.address_line_2 && <Text style={{ fontFamily: theme.font400, fontSize: 14 }}>{item?.address_line_2}</Text>}
                                    {item?.address_line_3 && <Text style={{ fontFamily: theme.font400, fontSize: 14 }}>{item?.address_line_3}</Text>}


                                    {item?.zip_code && <Text style={{ fontFamily: theme.font400, fontSize: 14 }}>{item?.zip_code}</Text>}

                                </View>

                                {/* <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <TouchableOpacity style={styles.button} >
                                        <Text style={[styles.buttonText, gStyles.font700, gStyles.textUpperCase]}>
                                            Book Now
                                        </Text>
                                    </TouchableOpacity> */}
                                {/* <View style={[styles.locationItemContainer, { alignItems: "center" }]}>
                                        <StarIcon style={{ marginEnd: 2 }} />
                                        <Text style={[gStyles.font400, { fontSize: 12 }]}>4.8</Text>
                                    </View> */}
                                {/* </View> */}
                            </View>
                        </TouchableOpacity>
                    </View >
                ))
                }
            </>
            }
        </>

    )
}



const styles = StyleSheet.create({
    locationItemContainer: {
        flexDirection: "row",
        marginBottom: 16,
        alignItems: "center"
        // justifyContent: "space-between",

    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 20,
        // width: '100%',
        // height: 'auto',
        // aspectRatio: 
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