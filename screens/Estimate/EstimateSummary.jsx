import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import InfoCard from "../../components/InfoCard";
import { ExclamationCircleIcon } from "react-native-heroicons/outline";
import Cta from "../../components/Cta";
import SafeAreaContainerStepForm from "../../components/SafeAreaContainerStepForm";
import Card from "../../components/Card";

export default function EstimateSummary({ formData, currentStep, handlePress }) {

    const { theme } = useContext(ThemeContext);

    const { category, selectedItems, description } = formData;
    const gStyles = getGlobalStyles(theme);
    const styles = StyleSheet.create({
        serviceItem: {
            padding: 10,
            borderWidth: 1,
            borderColor: theme.border,
            marginVertical: 5,
            borderRadius: 10,
            backgroundColor: theme.white,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",


        },

        code: {
            backgroundColor: theme.blue,
            color: theme.lightText,
            marginEnd: 10,
            padding: 5,
            borderRadius: 5,
            fontFamily: theme.font500,
            fontSize: 12
        },
        serviceName: {
            fontFamily: theme.font500,
            fontSize: 14,
            flexWrap: 'wrap',
            flex: 1

        },
        price: {
            fontFamily: theme.font500,
            fontSize: 14,
            color: theme.mutedText
        }
    });

    const CareRender = ({ item }) => {
        return (
            <View style={styles.serviceItem}>
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                    <Text style={styles.code}>{item.code}</Text>
                    <Text style={styles.serviceName}>{item.name} </Text>
                </View>
                {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: theme.mutedText, fontSize: 12, fontFamily: theme.font500, marginEnd: 5 }}>Starts from</Text>

                    <Text style={styles.price}>

                        $ {item.national_cost}</Text>
                </View> */}
            </View>)

    }

    return (
        <>
            <SafeAreaContainerStepForm
                screenTitle='Estimate'
                allowedBack={true}
                step={currentStep}
                stepCount={4}
            >

                <InfoCard title='Selected Treatment'>

                    <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }} >
                        <Image source={{ uri: category?.image_path_url }} style={{ height: 30, width: 30, marginEnd: 16 }} />
                        <Text style={{
                            fontFamily: theme.font700, fontSize: 16,

                        }}>{category.name}</Text>


                    </View>

                </InfoCard>

                <View style={gStyles.infoCard}>
                    <Text style={gStyles.cardTitle}>Selected Services</Text>

                    {selectedItems && selectedItems.map((item, index) => <CareRender item={item} />)}
                </View>
                <InfoCard title='Notes'>

                    <Text style={{
                        fontFamily: theme.font500, fontSize: 12,
                        backgroundColor: theme.white, padding: 10, borderRadius: 10,
                    }}>{description?.userRequest}</Text>


                </InfoCard>

                <InfoCard title="Insurance">

                    {description?.selectedInsurance ?
                        <Card title={description.selectedInsurance.carrier}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                                <Text>Insurance Provider</Text>
                                <Text>{description.selectedInsurance.insurance_provider}</Text>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text>Member ID</Text>
                                <Text>{description.selectedInsurance.member_id}</Text>
                            </View>


                        </Card>
                        :
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <ExclamationCircleIcon size={24} style={{ marginEnd: 10 }} />
                            <Text style={{ fontFamily: theme.font500, }}>No Insurance found</Text>
                        </View>
                    }

                </InfoCard>



                <Cta title="Get an Estimate" handlePress={handlePress} />

            </SafeAreaContainerStepForm>
        </>
    )
}