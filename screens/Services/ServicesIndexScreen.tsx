import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { getDentalServices } from "../../services/dentalServices";
import ScreenHeader from "../../components/ScreenHeader";
import { APP_URL } from "../../config";

export default function ServicesIndexScreen() {

    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const gStyles = getGlobalStyles(theme);
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);

    const styles = StyleSheet.create({
        list: {
            paddingHorizontal: 20,
            backgroundColor: theme.white
        },

        itemContainer: {
            borderWidth: 1.5,
            borderStyle: 'solid',
            borderColor: theme.border,
            borderRadius: 3,
            marginBottom: 8,
            padding: 16
        },

        title: {
            fontSize: 16,
            letterSpacing: -0.25,
            fontFamily: theme.font700,

        },

        image: {
            // width: 25,
            // height: 25,
            // // borderRadius: 10,
            // marginBottom: 5,
            flex: 1,
            flexGrow: 1
            // resizeMode: 'contain'
        }
    });

    useEffect(() => {

        const fetchDentalServices = async () => {
            try {

                const data = await getDentalServices();
                setServices(data);

            } catch (error) {
                console.error(error);
            }
        }

        getDentalServices().then(setServices).catch(console.error);

    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[gStyles.safeAreaContainer]}>
                <ScreenHeader title="All Dental Services"
                    onBackPress={() => navigation.goBack()} />


                <FlatList
                    data={services}
                    keyExtractor={(item) => item.id.toString()}

                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Home', { screen: 'ServiceItem', params: { serviceItem: item } })}>

                            <View>
                                <View style={{ display: "flex", flexDirection: "row", alignItems:"center", marginBottom:12 }} >
                                    <View style={{ width: 24, height: 24, marginEnd: 8 }}>
                                        <Image source={{ uri: APP_URL + '/public/storage/' + item.image_path }} style={styles.image} />
                                    </View>
                                    <Text style={[styles.title]}>{item.name}</Text>
                                </View>

                               
                                <Text style={{ color: theme.gray, fontSize: 12, lineHeight: 18, textAlign: "justify", marginBottom:12 }}>{item.desc} </Text>
                                <View>
                                    <Text style={{ color: theme.gray }}>
                                        STARTS FROM
                                        <Text style={{ marginLeft: 6, color: theme.black, textDecorationLine: 'line-through' }}>$ {item.avg_cost}</Text>
                                        <Text style={{ color: theme.black, fontFamily: theme.font700, fontSize: 18 }}> $ {item.cost}</Text>
                                    </Text>
                                </View>
                            </View>



                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </SafeAreaProvider>
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