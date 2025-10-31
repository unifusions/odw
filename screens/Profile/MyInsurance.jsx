import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";

import getGlobalStyles from "../../theme/globalStyles";
import { useTheme } from "../../theme/ThemeProvider";
import SafeAreaContainer from "../../components/SafeAreaContainer";

import { useAuth } from "../../context/AuthContext";

import { useNavigation, } from "@react-navigation/native";
import Card from "../../components/Card";
import api from "../../services/api";
import useInsurance from "../../hooks/useInsurance";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";

export default function MyInsurance() {
    const { user } = useAuth();
    const { theme, toggleTheme, resetTheme, processing, setProcessing } = useTheme();
    const styles = getGlobalStyles(theme);
    const navigation = useNavigation();



    const { insurances, loading, errors } = useInsurance({ patientId: user?.patient?.id });

    const InsuranceCard = ({ insurance }) => {
        const DetailedLine = ({ label, value }) => {
            return (
                <View style={{ justifyContent: "space-between", flexDirection: "row", marginVertical: 2 }}>
                    <Text style={{ fontFamily: theme.font500, letterSpacing: 0.5 }}>{label}</Text>
                    <Text style={{ fontFamily: theme.font600, letterSpacing: 0.5 }}>{value}</Text>

                </View>
            )
        }
        return (

            <Card title={insurance.insurance_provider}>
                <TouchableOpacity style={{ paddingVertical: 20 }} onPress={() => navigation.navigate("InsuranceDetail", { insuranceItem: insurance })}>



                    <View>
                        <Text style={{ fontFamily: theme.font600, fontSize: 18, marginBottom: 16 }}>{insurance.insurance_provider}</Text>

                    </View>


                    <DetailedLine label="Member ID" value={insurance.member_id} />
                    <DetailedLine label="Relation" value={insurance.mode} />




                </TouchableOpacity>
            </Card>
        )
    }
    return (
        <SafeAreaContainer loading={loading}
            screenTitle="My Insurance" allowedBack={true}
        >



            <ScrollView showsVerticalScrollIndicator={false}>

                {insurances.length > 0 && insurances.map((item) => <InsuranceCard key={item.id} insurance={item} />)}


            </ScrollView>





            <View style={[styles.fixedBottomContainer, { paddingHorizontal: 20, paddingBottom: 10 }]}>
                <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate("AddInsurance")}>
                    <Text style={styles.buttonText}>Add Insurance</Text>
                </TouchableOpacity>
            </View>



        </SafeAreaContainer>

    )
}

