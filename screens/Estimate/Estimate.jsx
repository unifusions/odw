

import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenHeader from "../../components/ScreenHeader";
import { FlatList } from "react-native-gesture-handler";
import { getDentalCare } from "../../services/getDentalCare";
import ModalDialog from "../../components/ModalDialog";
import { CheckBadgeIcon } from "react-native-heroicons/outline";
import SearchBox from "../../components/SearchBox";
const Estimate = () => {
    const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    const [dentalCares, setDentalCares] = useState({});
    const [dcares, setDcares] = useState({});
    const [isConfirmVisible, setConfirmVisible] = useState(false);

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = dentalCares.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };
    useEffect(() => {

        getDentalCare().then(setDentalCares).catch(console.error);

    }, []);
    const [filteredData, setFilteredData] = useState(dentalCares);

    const ServiceCardView = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => setDcares(item)}>
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 20, borderWidth: 1, borderColor: theme.border, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                    <View style={{ borderStartColor: theme.blue, borderStartWidth: 2, borderStyle: 'solid', paddingStart: 8, maxWidth: "60%" }}>
                        <Text style={{ fontFamily: theme.font700, fontSize: 16, letterSpacing: -0.2, marginBottom: 6 }}>{item.name} </Text>
                        <Text style={{ fontFamily: theme.font400, color: theme.gray, fontSize: 16, textTransform: "uppercase" }}>Preventive </Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: theme.font500, fontSize: 16, color: theme.gray }}>Starts from $ {item.national_cost}</Text>
                        <Text style={{ fontFamily: theme.font700, fontSize: 20, alignSelf: "flex-end" }}>

                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.safeAreaContainer]}>
                <ScreenHeader title="Get an estimate"
                />

                <SearchBox />


                <FlatList
                    data={dentalCares}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <ServiceCardView item={item} />}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                </ScrollView>
            </SafeAreaView>

            <View style={{ padding: 20, borderTopColor: theme.border, borderTopWidth: 1, backgroundColor: theme.white }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                    <View>
                        <Text style={{ fontFamily: theme.font600 }}>{dcares.name}</Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: theme.font600 }}>$ {dcares.odw_cost}</Text>
                    </View>
                </View>
                "
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                    <View>
                        <Text style={{ fontFamily: theme.font600 }}>Insurance</Text>
                    </View>
                    <View>
                        <CheckBadgeIcon color={theme.success} />

                    </View>
                </View>

                <View>
                    <TouchableOpacity style={styles.cta} onPress={() => setConfirmVisible(true)}>
                        <Text style={styles.buttonText}>Get an Estimate</Text>
                    </TouchableOpacity>
                </View>


            </View>
            <ModalDialog
                visible={isConfirmVisible}
                title="Congratulations"
                message={`: Our team will work on the closest estimate for you and will revert back in 24
                hours. Meanwhile, average cost of this service is will be $ ${dcares.national_cost} ODW Cash discounts and deals can get you a price from ${dcares.odw_cost
                    }`}
                onConfirm={() => setConfirmVisible(false)}
            />
        </SafeAreaProvider>
    );
};

export default Estimate;
