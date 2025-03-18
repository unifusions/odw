import { useContext, useEffect, useState } from "react"
import { getDentalServices } from "../services/dentalServices";
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { ThemeContext } from "../theme/ThemeProvider";
import { BASE_URL } from "../config";

const { width, height } = Dimensions.get('window');

const ListServicesHome = () => {
    const [services, setServices] = useState([]);
    const theme = useContext(ThemeContext);
    useEffect(() => {
        console.log('using effect')
        const fetchDentalServices = async () => {
            try {
                const data = await getDentalServices();
                setServices(data);
                console.log('function working')
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
        // setServices(() = async() => getDentalServices());

        getDentalServices().then(setServices).catch(console.error);
        console.log('completed');
    }, []);

    const ServiceItem = ({ item }) => {
        return(

        <TouchableOpacity style={styles.serviceItem}>
            <View style={styles.icon}></View>
            <Image source={{ uri: BASE_URL + '/storage/' +item.image_path }} style={styles.icon} />
            <Text style={styles.serviceText}>{item.name}</Text>
        </TouchableOpacity>)
    }
    return (
        <View >
            <FlatList
                data={services}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => <ServiceItem item={item} />}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        // backgroundColor: "#F5F5F5",
    },
    list: {
        flexDirection: "row",
    },
    serviceItem: {
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "top",
        maxWidth:( width/4 )- 20
        // borderColor: "#ddd",
        // borderWidth: 1,
    },
    icon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    serviceText: {
        fontSize: 10,
        fontWeight: "500",
        color: "#000",
        fontFamily: 'Manrope_500Medium',
        textAlign: 'center'
    },
    container: {
        paddingVertical: 20,
        backgroundColor: "#f8f9fa", // Light gray background
    },
});
export default ListServicesHome;