import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext, useTheme } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { getDentalServices } from "../../services/dentalServices";
import ScreenHeader from "../../components/ScreenHeader";
import { APP_URL } from "../../config";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import LoadingDots from "../../components/LoadingDots";
import api from "../../services/api";
import useDentalServices from "../../hooks/useDentalServices";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";

export default function ServicesIndexScreen() {

    const navigation = useNavigation();
    const { theme } = useTheme();


    const { services, loading, errors } = useDentalServices({ featured: false });
    const styles = StyleSheet.create({
        // list: {
        //     paddingHorizontal: 20,
        //     backgroundColor: theme.white
        // },

        itemContainer: {
            backgroundColor: theme.white,
            borderWidth: 1.5,
            borderStyle: 'solid',
            borderColor: theme.border,
            borderRadius: 3,
            marginBottom: 8,
            padding: 16,
            elevation: 1,
        },

        title: {
            fontSize: 16,
            letterSpacing: -0.25,
            fontFamily: theme.font700,

        },

        image: {

            flex: 1,
            flexGrow: 1

        }
    });



    return (
        <SafeAreaContainer allowedBack={true} screenTitle='All Dental Services'>

            {loading ? <LoadingDotsWithOverlay />
                : <FlatList
                    data={services}
                    keyExtractor={(item) => item.id.toString()}

                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Home', { screen: 'ServiceItem', params: { serviceItem: item } })}>

                            <View>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                    <View style={{ width: 36, height: 36, marginEnd: 8 }}>
                                        <Image source={{ uri: item.image_path_url }} style={styles.image} />
                                    </View>
                                    <Text style={[styles.title]}>{item.name} </Text>
                                </View>


                                {/* <Text style={{ color: theme.gray, fontSize: 12, lineHeight: 18, textAlign: "justify", marginBottom: 12 }}>{item.desc} </Text> */}
                                {/* <View>
                            <Text style={{ color: theme.gray }}>
                                STARTS FROM
                                <Text style={{ marginLeft: 6, color: theme.black, textDecorationLine: 'line-through' }}>$ {item.avg_cost}</Text>
                                <Text style={{ color: theme.black, fontFamily: theme.font700, fontSize: 18 }}> $ {item.cost}</Text>
                            </Text>
                        </View> */}
                            </View>



                        </TouchableOpacity>
                    )}
                />
            }

        </SafeAreaContainer>

    )
}


// const styles = StyleSheet.create({
//     list:{
//         backgroundColor:"white"
//     },


//     container: {
//         alignItems: "center",
//         padding: 20,
//         backgroundColor: "white",
//         flex: 1,
//     },
//     imageContainer: {
//         position: "relative",
//         alignItems: "center",
//         marginBottom: 20,
//     },
//     profileImage: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         backgroundColor: "#F1F1F1",
//     },
//     editButton: {
//         position: "absolute",
//         bottom: 5,
//         right: 5,
//         backgroundColor: "#1E293B",
//         padding: 6,
//         borderRadius: 20,
//     },
//     input: {
//         width: "100%",
//         padding: 14,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: "#E5E5E5",
//         marginBottom: 10,
//         backgroundColor: "#F7F7F7",
//     },
//     inputIconContainer: {
//         width: "100%",
//         flexDirection: "row",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#E5E5E5",
//         borderRadius: 8,
//         paddingHorizontal: 12,
//         paddingVertical: 14,
//         backgroundColor: "#F7F7F7",
//         marginBottom: 10,
//     },
//     inputIcon: {
//         flex: 1,
//         marginLeft: 10,
//     },
//     dateText: {
//         flex: 1,
//         marginLeft: 10,
//         color: "#9E9E9E",
//     },
// });