import { useContext, useEffect, useState } from "react";

// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import getGlobalStyles from "../../theme/globalStyles";
import { ThemeContext, useTheme } from "../../theme/ThemeProvider";
import SafeAreaContainer from "../../components/SafeAreaContainer";


import { StyleSheet, View, Button, SafeAreaView, ScrollView, Text, TouchableOpacity, Touchable } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Card from "../../components/Card";
 
import useEstimates from "../../hooks/useEstimates";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";


const EstimateCard = ({ estimate, handlePress }) => {
    const { theme } = useTheme();
    return (
        <TouchableOpacity onPress={handlePress}>
            <Card title={`Est #${estimate.id}`}>
                <View>

                    <Text style={{ fontFamily: theme.font400 }}>
                        {estimate.id} | {estimate.status === null && "In Review"}
                    </Text>

                </View>
            </Card>
        </TouchableOpacity>
    )
}
const MyEstimates = () => {


    const open = useSharedValue(false);
    const onPress = () => {
        open.value = !open.value;
    };



    const { user } = useAuth();
    const { estimates, loading } = useEstimates({ patientId: user?.patient?.id });
    const navigation = useNavigation();
    useEffect(() => {
        // setProcessing(true);
    })


    return (
        <ScrollView>
            {
              estimates && estimates.map((item) => <EstimateCard key={item.id} estimate={item} handlePress={() => navigation.navigate("ShowEstimate", { estimate: item })} />)
            }

            {loading && <LoadingDotsWithOverlay />}



        </ScrollView>

    )

}

export default MyEstimates;