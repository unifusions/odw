import { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import getGlobalStyles from "../../theme/globalStyles";
import { ThemeContext } from "../../theme/ThemeProvider";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { getInsurance } from "../../services/insurance";
import { AuthContext } from "../../context/AuthContext";

import { useNavigation } from "@react-navigation/native";

export default function MyInsurance() {
    const { user } = useContext(AuthContext);
    const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [insurances, setInsurances] = useState([]);
    useEffect(() => {


        // getInsurance({ patient_id: user.patient.id }).then(
        //     response => {
        //         setInsurances(response.data);
        //         // console.log(response);
        //     }
        // )

        //     // const fetchInsurance = async () => {
        //     //     const data = await getInsurance(user.patient.id);
        //     //     console.log("Data received from getInsurance:", data); // Inspect this data
        //     //     setInsurances(data);

        //     // }
        //     // fetchInsurance();


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



                <View>
                    <Text style={{ alignSelf: "flex-end", paddingVertical: 20, color: theme.white }}>Insurance Company</Text>
                </View>
                <Text style={{ color: theme.white, fontFamily: theme.font600, fontSize: 18, marginBottom: 16 }}>User Name</Text>

                <DetailedLine label="Member ID" value="2178388216" />
                <DetailedLine label="Group ID" value="2178388216" />




            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaContainer
            screenTitle="My Insurance" allowedBack={true}
        >

            <ScrollView>


                <InsuranceCard />

            </ScrollView>


            <View style={[styles.fixedBottomContainer]}>
                <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate("AddInsurance")}>
                    <Text style={styles.buttonText}>Add Insurance</Text>
                </TouchableOpacity>
            </View>



        </SafeAreaContainer>

    )
}

