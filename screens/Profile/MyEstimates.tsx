import { useCallback } from "react";

 
import getGlobalStyles from "../../theme/globalStyles";
import {   useTheme } from "../../theme/ThemeProvider";
 


import {   View,   ScrollView, Text, TouchableOpacity } from 'react-native';
 
import Card from "../../components/Card";

import useEstimates from "../../hooks/useEstimates";
import { useAuth } from "../../context/AuthContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";
import StatusBadge from "../../components/StatusBadge";


const EstimateCard = ({ estimate, handlePress }) => {
    const { theme } = useTheme();
    let is_quick = estimate.is_quick ? 'Quick Estimate #' : 'Estimate #';
    let title = is_quick + estimate.id;
    return (
        <TouchableOpacity onPress={handlePress}>
            <Card title={title}>
                
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 }}>

                    <Text style={{ fontFamily: theme.font400 }}>{estimate.created_at}</Text>
                    <StatusBadge status={estimate.status} />


                </View>
            </Card>
        </TouchableOpacity>
    )
}
const MyEstimates = () => {




    const { user } = useAuth();
    const { estimates, loading, errors, refetch } = useEstimates({ patientId: user?.patient?.id });
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            refetch();   // ⬅ Refresh API when tab becomes active
        }, [])
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            {
                estimates && estimates.map((item) => <EstimateCard key={item.id} estimate={item} handlePress={() => navigation.navigate("ShowEstimate", { estimate: item })} />)
            }

            {loading && <LoadingDotsWithOverlay />}



        </ScrollView>

    )

}

export default MyEstimates;