import { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

import {  useAuth } from "../../context/AuthContext";
import Card from "../../components/Card";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useSecondOpinion from "../../hooks/useSecondOpinion";
import StatusBadge from "../../components/StatusBadge";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";

const MySecondOpinions = () => {
    const { user } = useAuth();
    const { theme } = useTheme();

    const navigation = useNavigation();
    const { secondopinions, loading, errors, refetch } = useSecondOpinion({ patientId: user?.patient?.id });


    useFocusEffect(
        useCallback(() => {
            refetch();   // ⬅ Refresh API when tab becomes active
        }, [])
    );

    const RenderSOList = ({ item, handlePress }) => {
        return (
            <TouchableOpacity onPress={handlePress} >
                <Card>
                    <View style={{ borderColor: theme.border, borderBottomWidth: 1, borderStyle: "solid", paddingBottom: 8 }}>
                        <Text style={{ fontFamily: theme.font400, fontSize: 12, color: theme.grey, marginBottom: 6 }}>Second Opinion #{item.id}</Text>
                        {item.subject && <Text style={{ fontFamily: theme.font600, fontSize: 16 }}>{item.subject}</Text>}
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 }}>
                        <Text>{item.created_at}  </Text>
                        <StatusBadge status={item.status} />
                        {/* <Text>{item.status}</Text> */}
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }
    return (

        <ScrollView>

         
            {secondopinions.length > 0 &&
                secondopinions.map((item) => <RenderSOList key={item.id} item={item}
                    handlePress={() => navigation.navigate("ShowSo", { secondOpinion: item })
                    }
                />)
            }

{loading && <LoadingDotsWithOverlay />}
        </ScrollView>



    )
}

export default MySecondOpinions;