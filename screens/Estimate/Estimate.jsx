

import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenHeader from "../../components/ScreenHeader";
import { FlatList } from "react-native-gesture-handler";
import { getDentalCare } from "../../services/getDentalCare";
import ModalDialog from "../../components/ModalDialog";
import { CheckBadgeIcon } from "react-native-heroicons/outline";
import SearchBox from "../../components/SearchBox";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import CompassIcon from "./CompassIcon";
import RocketIcon from "./RocketIcon";
import { useNavigation } from "@react-navigation/native";
const Estimate = () => {
    const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    const [dentalCares, setDentalCares] = useState({});
    const [dcares, setDcares] = useState({});
    const [isConfirmVisible, setConfirmVisible] = useState(false);

    const navigation = useNavigation();
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

    const localStyles = StyleSheet.create({
        optionContainer: {
            flexDirection: "row",
            marginVertical: 6,
            borderColor: theme.border,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: theme.white,
            padding: 12,
            alignItems: "center"

        },

        title: {
            fontFamily: theme.font600,
            fontSize: 20
        },
        subtitle: {
            flexShrink: 1,
            flexWrap: 'wrap',
            fontFamily: theme.font400,
            fontSize: 14,

        }
    });
    return (
        <SafeAreaContainer>
            <View>
                <Text style={{ fontFamily: theme.font700, fontSize: 32, paddingEnd: 80, marginBottom: 16 }}>
                    How would you like to get an Estimate?

                </Text>
            </View>

            <View style={{ backgroundColor: theme.white, padding: 12, borderRadius: 12 }}>


                <TouchableOpacity
                    style={localStyles.optionContainer}
                    onPress={() => navigation.navigate('GuidedEstimate')}
                >
                    <View style={{ marginEnd: 12 }}>
                        <CompassIcon size={64} />
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={localStyles.title}>
                            Help Me Decide
                        </Text>
                        <Text style={localStyles.subtitle}>
                            We’ll guide you to right estimate
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={localStyles.optionContainer}
                    onPress={() => navigation.navigate('QuickEstimate')}

                >
                    <View style={{ marginEnd: 12 }}>
                        <RocketIcon size={64} />
                    </View>
                    <View style={{ flex: 1 }} >
                        <Text style={localStyles.title}>
                            Tell Us What’s going on
                        </Text>
                        <Text style={localStyles.subtitle}>
                            Skip the steps - Just explain your dental concern
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        </SafeAreaContainer>
    );
};

export default Estimate;
