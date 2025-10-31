import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import ScreenHeader from "../../components/ScreenHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { ChevronBarLeft } from "react-bootstrap-icons";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import BottomButton from "../../components/BottomButton";
import { useBooking } from "../../context/BookingContext";

export default function ServiceItemScreen() {

    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const gStyles = getGlobalStyles(theme);
    const route = useRoute();
    const { serviceItem } = route.params;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const medicalNames = serviceItem?.medical_name.split(", ").map(item => item.trim());


    const { updateBooking } = useBooking();

    const handleCategoryTap = ({item}) => {
        // updateBooking("category", category); // pre-fill
        navigation.navigate("CategoryBooking", { category: item }); // skip category
    };
    // const navigation = useNavigation();
    const localStyles = StyleSheet.create({
        container: {

            // alignItems: "center",
            padding: 20,
            backgroundColor: "white",
            flex: 1,

        },
        imageContainer: {
            // backgroundColor:'red',
            position: 'relative',
            height: windowHeight / 3, width: '100%',
            marginBottom: 20
        },
        profileImage: {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#F1F1F1",
        },
        editButton: {
            position: "absolute",
            bottom: 5,
            right: 5,
            backgroundColor: "#1E293B",
            padding: 6,
            borderRadius: 20,
        },
        input: {
            width: "100%",
            padding: 14,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#E5E5E5",
            marginBottom: 10,
            backgroundColor: "#F7F7F7",
        },
        inputIconContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 14,
            backgroundColor: "#F7F7F7",
            marginBottom: 10,
        },
        inputIcon: {
            flex: 1,
            marginLeft: 10,
        },
        dateText: {
            flex: 1,
            marginLeft: 10,
            color: "#9E9E9E",
        },
    });

    return (
        <SafeAreaProvider>

            <SafeAreaView style={gStyles.safeAreaContainer}>

                <ScrollView style={{ marginBottom: 60 }}>
                    <View style={localStyles.container}>
                        <View style={localStyles.imageContainer}>

                            {serviceItem.header_image_url ?
                                <Image source={{ uri: serviceItem.header_image_url }}

                                    style={{ flex: 1, resizeMode: 'cover', borderRadius: 16 }} // or 'cover'
                                /> : <Text> No image found</Text>
                            }


                            <TouchableOpacity onPress={() => navigation.goBack()} style={{
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                padding: 15,
                                borderRadius: 25,
                            }}>
                                <ChevronLeftIcon size={22} color="#4A4A4A" />
                            </TouchableOpacity>

                        </View>

                        <View>



                            <Text style={{ color: theme.text, fontFamily: theme.font700, fontSize: 20, marginBottom: 8 }}>
                                {serviceItem.name}
                            </Text>



                            <View>
                                <FlatList
                                    data={medicalNames}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <Text key={index} style={{
                                            borderRadius: 5,
                                            backgroundColor: theme.tertiary,
                                            color: theme.white,
                                            paddingVertical: 3, marginEnd: 8, marginBottom: 8,
                                            paddingHorizontal: 10,
                                            borderColor: theme.tertiary,
                                            borderWidth: 1, borderStyle: 'solid',
                                            fontFamily: theme.font400, fontSize: 12
                                        }}>
                                            {item}
                                        </Text>
                                    )}
                                />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: 'center', marginBottom: 8, flexWrap: "wrap" }}>




                                <Text style={{ color: theme.mutedText, fontFamily: theme.font600, marginEnd: 3 }}>Starts from </Text>
                                <Text style={{ color: theme.text, fontFamily: theme.font700 }}>$ {serviceItem.cost}</Text>
                            </View>



                            <Text style={{ fontFamily: theme.font400, fontSize: 14, lineHeight: 21 }}>

                                {serviceItem.desc}
                            </Text>
                        </View>
                    </View>
                </ScrollView>


                <View style={[gStyles.fixedBottomContainer, { paddingHorizontal: 12, paddingBottom: 10 }]}>
                    <TouchableOpacity style={gStyles.cta} onPress={() =>{ 
                    //  setBookingFlow("clinic");
                    navigation.navigate("CategoryBooking", {
                     category: serviceItem})
                    }}
                    >
                        <Text style={gStyles.buttonText}>Book Appointment</Text>
                    </TouchableOpacity>
                </View>
 
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

