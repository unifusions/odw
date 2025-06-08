import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import getGlobalStyles from "../../theme/globalStyles";
import { ThemeContext } from "../../theme/ThemeProvider";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { getInsurance } from "../../services/insurance";
import { AuthContext } from "../../context/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';

const MyInsurance = () => {
    const { user } = useContext(AuthContext);
    const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);


    const [insurances, setInsurances] = useState([]);
    useEffect(() => {
        console.log('using effect');
        const fetchInsurance = async () => {
            const data = await getInsurance(user.patient.id);
            console.log("Data received from getInsurance:", data); // Inspect this data
            setInsurances(data);

        }
        fetchInsurance();
        console.log('effect completed');

    }, []);

    const InsuranceCard = () => {
        const DetailedLine = ({ label, value }) => {
            return (
                <View style={{ justifyContent: "space-between", flexDirection: "row", marginVertical: 2 }}>
                    <Text style={{ color: theme.white, fontFamily: theme.font500, letterSpacing: 0.5 }}>{label}</Text>
                    <Text style={{ color: theme.white, fontFamily: theme.font500, letterSpacing: 0.5 }}>{value}</Text>

                </View>
            )
        }
        return (
            <TouchableOpacity>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#0B4251', '#0D2833']} // An array of color strings
                    start={{ x: 0, y: 0 }} // The start point of the gradient (top-left)
                    end={{ x: 1, y: 1 }}   // The end point of the gradient (bottom-right)
                    style={{ paddingHorizontal: 10, paddingVertical: 20, borderRadius: 16, }}
                >


                    <View>
                        <Text style={{ alignSelf: "flex-end", paddingVertical: 20, color:theme.white }}>Insurance Company</Text>
                    </View>
                    <Text style={{ color: theme.white, fontFamily: theme.font600, fontSize: 18, marginBottom: 16 }}>User Name</Text>

                    <DetailedLine label="Member ID" value="2178388216" />
                    <DetailedLine label="Group ID" value="2178388216" />



                </LinearGradient>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaContainer
            screenTitle="My Insurance"
        >

            <ScrollView>
                <TouchableOpacity >
                    <View style={{ borderRadius:16, borderColor:'0D2833', borderWidth:1, paddingVertical : 50 }}>

                    </View>
                </TouchableOpacity>


                <InsuranceCard />

            </ScrollView>


        </SafeAreaContainer>

    )
}

export default MyInsurance;