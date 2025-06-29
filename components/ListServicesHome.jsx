import { useContext, useEffect, useState } from "react"
import { getDentalServices } from "../services/dentalServices";
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { ThemeContext } from "../theme/ThemeProvider";
import { APP_URL } from "../config";
import getGlobalStyles from "../theme/globalStyles";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

const ListServicesHome = () => {
    const [services, setServices] = useState([]);
    const theme = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);
    const gStyles = getGlobalStyles(theme);

    useEffect(() => {

        const fetchDentalServices = async () => {
            try {
                setLoading(true);
                const data = await getDentalServices();
                setServices(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        // setServices(() = async() => getDentalServices());

        getDentalServices().then(setServices).catch(console.error);
        console.log('completed');
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.primary} />
            </View>
        );
    }

    const ServiceItem = ({ item }) => {
        return (


            <TouchableOpacity style={styles.serviceItem} >
                <View style={styles.icon}></View>
                <Image source={{ uri: APP_URL + '/public/storage/' + item.image_path }} style={styles.icon} />
                <Text style={styles.serviceText}>{item.name}</Text>
            </TouchableOpacity>)
    }

    const navigation = useNavigation();
    return (
        <View >

            <FlatList
                data={services}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Home', { screen: 'ServiceItem',  params: { serviceItem: item } })}>
                        <View style={{ width: 32, height: 32, marginBottom: 18 }}>
                            <Image source={{ uri: APP_URL + '/public/storage/' + item.image_path }} style={styles.image} />

                        </View>
                        <Text style={gStyles.serviceTitle}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}


const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 4.5; // Fits 4 items per row with spacing

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2d3748",
        marginBottom: 8,
    },
    list: {
        paddingHorizontal: 5,
    },
    card: {
        width: cardWidth,
        alignItems: "center",
        marginRight: 10,
        backgroundColor: "#fff",
        // borderRadius: 8,
        padding: 8,
        // elevation: 2, // Android shadow
        // shadowColor: "#000", // iOS shadow
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
    },
    image: {
        // width: 25,
        // height: 25,
        // // borderRadius: 10,
        // marginBottom: 5,
        flex: 1, width: undefined, height: undefined,
        resizeMode: 'contain',
    },
    serviceName: {
        fontSize: 10,
        fontWeight: "500",
        textAlign: "center",
    },
});

export default ListServicesHome;