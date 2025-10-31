import { useContext, useEffect, useState } from "react";
import BookingWrapper from "./BookingWrapper";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import LoadingDots from "../../components/LoadingDots";
import { ClinicLocationServices } from "../../services/ClinicLocationServices";
import api from "../../services/api";
import { ThemeContext } from "../../theme/ThemeProvider";
import { MapPinIcon } from "react-native-heroicons/outline";
import { getClinicDistance, getDistanceFromLatLonInMiles } from "../../services/getDistanceInMiles";
import { useBooking } from "../../context/BookingContext";

export default function SelectClinic() {

    const [loading, setLoading] = useState(false);
    const [clinics, setClinics] = useState([]);
   
    const { booking, updateBooking } = useBooking();
    const { theme } = useContext(ThemeContext);
    const windowHeight = Dimensions.get('window').height;

    const getClinics = async () => {
        try {
            const response = await api.get('/clinics');
            setClinics(response.data)
        }
        catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        setLoading(true)
        getClinics();

        // setLoading(false)
    }, []);


    const RenderItem = ({ item }) => {
        const isSelected = booking?.clinic ? (booking?.clinic.id === item.id) : false;
        return (
            <TouchableOpacity style={{
                backgroundColor: theme.white,
                borderStyle: 'solid', borderRadius: 5, borderWidth: 1, padding: 8, marginBottom: 12,
                borderColor: isSelected ? theme.blue : theme.border
            }} onPress={() => updateBooking({
                clinic : item
            })}>
 
                <View>
                    <Image source={{ uri: item.logo_url }} style={{ width: '100%', height: (windowHeight / 5), marginBottom: 12 }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={{ fontFamily: theme.font600, color: theme.dark, marginBottom: 4, fontSize: 16 }}>{item.name}</Text>
                    <View style={{ flexDirection: "row", alignContent: "center", alignItems:"center"  }} >
                        <MapPinIcon size={20} />
                        <Text style={{ color: theme.gray }}>
                            {
                                (item.latitude && item.longitude) ?
                                    <>{getClinicDistance(item.latitude, item.longitude).toFixed(2)} m</>
                                    : <Text>0 m</Text>
                                // getDistanceFromLatLonInMiles(location).toFixed(2) : 0 
                            }

                        </Text>
                    </View>

                </View>
                <Text style={{ fontSize: 12, fontFamily: theme.font500, color: theme.gray }}>
                    {item.address_line_1}</Text>

                <Text style={{ fontSize: 12, fontFamily: theme.font500, color: theme.gray }}>
                    {item.address_line_2}</Text>

                {item.address_line_3 && <Text style={{ fontSize: 12, fontFamily: theme.font500, color: theme.gray }}>
                    {item.address_line_3}</Text>}
                <Text style={{ fontSize: 12, fontFamily: theme.font500, color: theme.gray }}>
                    {item.state} - {item.zip_code}</Text>

            </TouchableOpacity>
        )
    }

    return (
        <BookingWrapper screenTitle="Select Clinic" heading="Pick Your Smile Spot">
            {loading ?
                <View style={{ flex: 1, justifyContent: "center" }}><LoadingDots />
                </View> :
                <>

                    <FlatList
                        data={clinics}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <RenderItem item={item} />
                        }
                    />

                </>
            }

        </BookingWrapper>
    )
}