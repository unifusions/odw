

import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";;
import useDentalServices from "../hooks/useDentalServices";
import SectionHeader from "./SectionHeader";
import ServiceItem from "./home/ServiceItem";

import ServiceItemSkeleton from "./home/skeleton/ServiceItemSkeleton";





const ListServicesHome = () => {


    const { services, loading, errors } = useDentalServices({ featured: true })
    const navigation = useNavigation();

    return (
        <>

            {loading ? <ServiceItemSkeleton /> : <>
                <SectionHeader
                    sectionTitle="Dental Services"
                    touchableText="See All"
                    handlePress={() => navigation.navigate('Home', { screen: 'AllServices' })}
                />

                <View style={{ marginBottom: 16 }}>
                    <View style={styles.serviceContainer}>

                        {services.length > 0 &&
                            services.map((item) =>
                                <ServiceItem key={item.id.toString()} item={item}
                                    handlePress={() => navigation.navigate('Home', { screen: 'ServiceItem', params: { serviceItem: item } })} />)}

                    </View>
                </View>
            </>}

        </>
    )
}



const styles = StyleSheet.create({

    serviceContainer: {
        marginHorizontal: "auto",
        width: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-around',
    },


});

export default ListServicesHome;