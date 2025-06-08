import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import getGlobalStyles from "../../theme/globalStyles";
import { ThemeContext } from "../../theme/ThemeProvider";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { getSecondOpinions } from "../../services/getSecondOpinions";
import { AuthContext } from "../../context/AuthContext";

const MySecondOpinions = () => {
    const { user } = useContext(AuthContext);
    const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);

    const [secondopinions, setSecondopinions] = useState([]);

    useEffect(() => {

        getSecondOpinions(user.patient.id).then(setSecondopinions).catch(console.error);


    }, []);

    const RenderSOList = ({item}) => {
        return (
            <TouchableOpacity style={{ borderColor: theme.border, borderRadius: 10, borderWidth:1, borderStyle:"solid", marginVertical:8, paddingHorizontal: 12, paddingVertical: 18 }}>
                <View style={{ borderColor: theme.border, borderBottomWidth:1, borderStyle:"solid", paddingBottom: 8 }}>
                <Text style={{ fontFamily:theme.font400, fontSize:12, color:theme.grey, marginBottom: 6 }}>#{item.id}</Text>
                <Text style={{ fontFamily:theme.font600, fontSize: 16 }}>{item.subject}</Text>
                </View>
                
                <View style={{ flexDirection:"row", justifyContent:"space-between" }}>
            <Text>{item.created_at}</Text>
            <Text>{item.status}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaContainer
            screenTitle="My Second Opinions"
        >
            <ScrollView>
                {secondopinions.length > 0 &&
                    secondopinions.map((item) => <RenderSOList key={item.id} item={item} />)
                }
            </ScrollView>
            
        </SafeAreaContainer>

    )
}

export default MySecondOpinions;