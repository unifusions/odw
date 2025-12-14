import { View, Text, StyleSheet } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { useRoute } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import Card from "../../components/Card";
import ShowEstimateReply from "./ShowEstimateReply";
import StatusBadge from "../../components/StatusBadge";

export default function ShowEstimate() {
    const { estimate } = useRoute().params;
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        infoContainer: {
            flexDirection: "row",
            justifyContent: "space-between",

            paddingVertical: 4,
            alignItems: "center",
            borderTopColor: theme.border,
            borderBottomColor: theme.border,
            borderTopWidth: 1,
            // borderBottomWidth: 1,
        },
        text: {
            fontSize: 14,
            fontFamily: theme.font400
        },
        subjectWrapper: {
            flexDirection: "row",

        },
        subject: {
            fontFamily: theme.font700
        },
        description: {
            marginBottom: 8,
        }
    })

    return (
        <SafeAreaContainer allowedBack={true} screenTitle="Estimate">
            <Card

                titleSeperator={true}
                subTitle={estimate?.created_at}
                title={`Estimate #${estimate.id} `}>
                {estimate?.subject &&
                    <View style={styles.subjectWrapper}>
                        <Text style={styles.subject}>{estimate?.subject}</Text>

                    </View>
                }

                {estimate?.description &&
                    <Text style={styles.description}>{estimate?.description}</Text>
                }



                <View style={[styles.infoContainer]}>
                    <Text style={[styles.text]}>
                        Insurance
                    </Text>
                    <Text  >
                        {estimate?.insurance_id ? 'Yes' : 'No'}
                    </Text>
                </View>

                <View style={[styles.infoContainer]}>
                    <Text style={[styles.text]}>
                        Status
                    </Text>
                    <Text  >
                        
                        <StatusBadge status={estimate?.status} />
                    </Text>
                </View>

                {/* <Text>{JSON.stringify(estimate?.last_visit, null, 2)}</Text> */}
            </Card>


            {(estimate?.replies && (estimate?.status === "closed" || estimate?.status === "answered")) &&
                <ShowEstimateReply
                    reply={estimate?.replies}
                />
            }
        </SafeAreaContainer>)
}