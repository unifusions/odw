import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import generateDates from "../../helpers/generateDates";
import ScrollableDatePicker from "../../components/ScrollableDatePicker";
import { useEffect, useState } from "react";
import TimeSlotPicker from "../../components/TimeSlotPicker";
import { useRoute } from "@react-navigation/native";
import BottomButton from "../../components/BottomButton";

import { useTheme } from "../../theme/ThemeProvider";

import { useBooking } from "../../context/BookingContext";
import BookSpecialistOverlay from "./BookSpecialistOverlay";


const ScrollContainer = ({ children }) => {
    return (
        <ScrollView style={{ marginBottom: 64 }} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    )
}

export default function BookSpecialist() {
    const dates = generateDates();
    const route = useRoute();
    const { specialist } = route.params;

    const { theme } = useTheme();

    const [loading, setLoading] = useState(false);
    const { booking, updateBooking } = useBooking();
    const [overlay, setOverlay] = useState(false);
    useEffect(() => {
        updateBooking({
            specialist: specialist,
            provider_type: "Specialist"
        })
    }, []);


    const ClinicList = ({ item }) => {


        const isSelected = booking?.clinic ? (booking?.clinic.id === item.id) : false;

        return (
            <>


                <View>

                    <TouchableOpacity onPress={() => updateBooking({
                        clinic: item
                    })} style={{
                        backgroundColor: theme.white,
                        borderStyle: 'solid', borderRadius: 5, borderWidth: 1, padding: 8, marginBottom: 12,
                        borderColor: isSelected ? theme.blue : theme.border
                    }}>
                        <Text>{item?.name}</Text>
                    </TouchableOpacity>
                </View>



            </>)
    }

    return (
        <>
            <SafeAreaContainer screenTitle={"Book Specialist"}
                loading={loading}
            >
                <ScrollContainer>

                    <View style={{
                        flex: 1, flexDirection: "row", alignItems: "center", gap: 16
                    }}>
                        <Image source={{ uri: specialist.photo_url }}
                            style={{ borderRadius: 50 }}
                            height={50} width={50} />
                        <Text ellipsizeMode="tail" style={{
                            flexWrap: "wrap", fontFamily: theme.font700
                        }}>{specialist?.name}</Text>
                    </View>


                    <FlatList
                        data={specialist.clinics}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}
                        renderItem={({ item }) => <ClinicList item={item} />}
                        horizontal={true}

                    />


                    <>

                        <ScrollableDatePicker dates={dates}
                            selectedDate={booking?.time?.selectedDate?.fullDate}
                            handleSelect={(item) =>
                                updateBooking({ time: { selectedDate: item } })
                            }
                        />

                        <TimeSlotPicker start="08:00" end="20:00" disabled={booking?.time?.selectedDate?.fullDate ? false : true}
                            selectedTimeSlot={booking?.time?.selectedSlot} handleSelect={(item) => updateBooking({ time: { selectedSlot: item } })} />


                    </>
                </ScrollContainer>
                <BookSpecialistOverlay
                    visibility={overlay}
                    requestClose={() => setOverlay(false)}
                    specialist={specialist}
                />

                <BottomButton value="Book Now" handlepress={() => setOverlay(true)} />

            </SafeAreaContainer>

        </>
    )
}