import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import SafeAreaContainer from "../../../components/SafeAreaContainer";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../theme/ThemeProvider";
import Card from "../../../components/Card";
import { APP_URL } from "../../../config";
import RowKeyValue from "../../../components/RowKeyValue";
import BottomButton from "../../../components/BottomButton";
import api from "../../../services/api";
import BottomSheetDialog from "../../../components/BottomSheetDialog";

export default function InsuranceDetail() {

    const route = useRoute();
    const navigation = useNavigation();
    const { insuranceItem } = route.params;
    const { attachments } = insuranceItem;
    const { theme } = useContext(ThemeContext);
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const [confirmVisible, setConfirmVisible] = useState(false);
    const styles = StyleSheet.create({

        infoContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8
        },
        borderBelow: {
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        text: {
            fontSize: 14,
            fontFamily: theme.font400,
            textAlign: "right"
        },
        bold: {
            fontFamily: theme.font600
        },
        insuranceCardContainer: {
            // position: 'relative',

            //  width: '100%',
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            backgroundColor: theme.white,
            borderRadius: 20,
            height: windowHeight / 4,
            // elevation: 3, // shadow for Android
            // shadowColor: "#000", // shadow for iOS

            // shadowOpacity: 0.1,
            // shadowRadius: 5,
            width: windowWidth - 40,
        },

        insuranceCard: {

            width: '100%',
            height: '100%',
            resizeMode: "cover",
            borderRadius: 20,
        }

    });

    const deleteInsurance = async () => {
        let apiUrl = '/delete-insurance';

        try {
            const response = await api.post(apiUrl, {
                insurance_id: insuranceItem.id
            })
            
            if (response.data.success) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Insurance" }]
                })
            }


        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>

            <SafeAreaContainer allowedBack={true} screenTitle={insuranceItem.member_id || "Insurance"}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 60 }}>

                    {attachments && attachments.length > 0 &&
                        <ScrollView horizontal={true} >

                            {attachments.map((item) =>
                                <View style={styles.insuranceCardContainer} key={item.id} >
                                    <Image source={{ uri: APP_URL + '/storage/' + item.path }} style={styles.insuranceCard} />
                                </View>
                            )}

                        </ScrollView>
                    }

                    <Card title="Subscriber Details">
                        <RowKeyValue
                            label={"First Name"}
                            value={insuranceItem?.first_name}
                        />
                        <RowKeyValue
                            label={"Last Name"}
                            value={insuranceItem?.last_name}
                        />
                        <RowKeyValue
                            label={"Date of Birth"}
                            value={insuranceItem?.dob}
                        />


                        <RowKeyValue
                            label={"Relation with Subscriber"}
                            value={insuranceItem?.relation}
                        />

                        <View style={[styles.infoContainer]}>
                            <Text style={[styles.text]}>
                                Address
                            </Text>
                            <View>
                                <Text style={[styles.text, styles.bold]}>
                                    {insuranceItem.address_line_1}
                                </Text>
                                <Text style={[styles.text, styles.bold]}>
                                    {insuranceItem.address_line_2}
                                </Text>
                                <Text style={[styles.text, styles.bold]}>
                                    {insuranceItem.address_line_3}, {insuranceItem.city},
                                    {insuranceItem.state} - {insuranceItem.zip_code}
                                </Text>
                            </View>

                        </View>



                    </Card>

                    <Card title="Insurance Details">

                        <RowKeyValue
                            label={"Member ID"}
                            value={insuranceItem?.member_id}
                        />


                        <RowKeyValue
                            label={"Insured By"}
                            value={insuranceItem?.mode}
                        />

                        <RowKeyValue
                            label={"Provider"}
                            value={insuranceItem?.insurance_provider}
                        />

                        <RowKeyValue

                            label={"Carrier"}
                            value={insuranceItem?.carrier}
                        />

                        <RowKeyValue
                            borderBelow={false}
                            label={"Group/Plan Number"}
                            value={insuranceItem?.plan_no}
                        />




                    </Card>


                </ScrollView>
                <BottomButton buttonTheme="danger"
                    value="Delete Insurance" handlepress={() => setConfirmVisible(true)} />

                <BottomSheetDialog
                    visible={confirmVisible}
                    title="Delete"
                    message="Are you sure you want to delete this insurance?"
                    onConfirm={deleteInsurance}
                    onCancel={() => setConfirmVisible(false)}
                    confirmText="Delete"
                />
            </SafeAreaContainer >

        </>
    )
}