

import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";





import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext } from "react";

import getGlobalStyles from "../../theme/globalStyles";
import { ThemeContext, useTheme } from "../../theme/ThemeProvider";
import { ChevronLeftIcon, MapPinIcon } from "react-native-heroicons/outline";

import MapView, { Marker, UrlTile } from "react-native-maps";

import { practiseYearCalculator } from "../../helpers/practiseyears";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import Card from "../../components/Card";


export default function ShowClinic() {

    const navigation = useNavigation();
    const { theme } = useTheme();
    const gStyles = getGlobalStyles(theme);
    
    const { clinic, distance } =  useRoute().params;

    const windowHeight = Dimensions.get('window').height;




    const localStyles = StyleSheet.create({

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

        infoCard: {
            paddingVertical: 15, borderBottomColor: theme.border, borderBottomWidth: 1
        },

        cardTitle: {
            fontFamily: theme.font700,
            fontSize: 14,
            marginBottom: 6,
        },

        clinicName: {
            fontFamily: theme.font700,
            color: theme.dark,
            fontSize: 18,
            letterSpacing: -0.2,
            marginBottom: 8
        },

        categoryCard: {
            borderWidth: 1,
            borderColor: theme.border,
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "space-between"
        },
        categoryTitle: {
            borderStartColor: theme.blue,
            borderStartWidth: 2,
            paddingStart: 5,
            color: theme
        },

        title: { fontSize: 18, fontWeight: "bold", textAlign: "center", margin: 10 },
        map: {
            width: "100%",
            height: windowHeight / 3,
            borderRadius: 24,
        },

        description: {
            fontFamily: theme.font400,
            textAlign: 'justify',
            fontSize: 14,
            lineHeight: 21,
            marginBottom: 16
        }
    });

    const formatTime = (timeString) => {
        // timeString = "08:00:00"
        const [hours, minutes] = timeString.split(":");
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));

        return date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const Schedule = ({ schedule }) => {
        return (
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 2 }}>
                <Text style={{ fontFamily: theme.font500 }}>{schedule.day_of_week}


                </Text>


                {schedule.is_open ? <Text style={{ fontFamily: theme.font600, color: theme.mutedText }}>{schedule.open_time && formatTime(schedule.open_time)} - {schedule.close_time && formatTime(schedule.close_time)} </Text> : <Text style={{ fontFamily: theme.font500, color: theme.danger }}>Closed</Text>}



            </View>
        )
    }
    const Category = ({ category }) => {
        return (
            <View style={localStyles.categoryCard}>
                <View style={localStyles.categoryTitle}>
                    <Text style={{ fontFamily: theme.font500 }}>
                        {category.name}

                    </Text>
                </View>

                <Text style={{ fontFamily: theme.font600, color: theme.mutedText }}>
                    $ {category.cost} ~ {category.max_cost}
                </Text>
            </View>
        )
    }

    const Dentist = ({ dentist }) => {
        return (
            <>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                    <View>
                        <Image source={{ uri: dentist.photo_url }} style={{
                            width: 80, height: 80, marginEnd: 8,
                            resizeMode: 'cover',
                            borderRadius: 6,
                        }} />
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: theme.font600,
                            fontSize: 16,
                        }}>{dentist.name}</Text>
                        <Text style={{
                            fontFamily: theme.font400,
                            fontSize: 16,
                        }}>{practiseYearCalculator(dentist.practise_from)} years of Practise</Text>
                    </View>
                </View>


            </>
        )
    }

    return (
        <SafeAreaContainer>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 50 }}>
                <View  >
                    <View style={localStyles.imageContainer}>


                        

                        <Image source={{ uri: clinic?.logo_url }} style={{
                            flex: 1,
                            resizeMode: 'cover',
                            borderRadius: 20,

                        }} />


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


                    <Card title={clinic.name}>



                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <MapPinIcon />
                                <Text>
                                    {distance ?? '0'} miles   </Text>
                            </View>

                            <Text style={{ color: theme.success, fontSize: 12, fontFamily: theme.font500 }}>
                                OPEN
                            </Text>

                            <Text style={{ fontFamily: theme.font500, fontSize: 12 }}> 24/7</Text>
                        </View>




                        <Text style={localStyles.description}>

                            {clinic.desc}

                        </Text>

                    </Card>

                    <Card title=" Consultation Hours">
                        {clinic.schedules.map((schedule) => <Schedule key={schedule.id} schedule={schedule} />)}

                    </Card>


                    <Card title="Services">


                        {clinic?.services?.map((service) => <Category key={service.id} category={service} />)}



                    </Card>


                    <Card title="Dentists" >

                        {clinic.dentists && clinic.dentists.map((item) => <Dentist key={item.id} dentist={item} />)}
                        {/* <View style={localStyles.infoCard}> */}



                        {/* {clinic.dentists.map((item) => console.log(item.name) )} */}


                        {/* </View> */}

                    </Card>





                </View>

            </ScrollView>
            <View style={[gStyles.fixedBottomContainer, { paddingHorizontal: '12' }]}>
                <TouchableOpacity style={gStyles.cta} onPress={() => {
                    //  setBookingFlow("clinic");
                    navigation.navigate("ClinicBooking", {
                        clinic: clinic
                    })
                }
                }>
                    <Text style={gStyles.buttonText}>Book Appointment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaContainer >
    )
}