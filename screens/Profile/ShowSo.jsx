import { useNavigation, useRoute } from "@react-navigation/native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { StyleSheet, Text,   View } from "react-native";
import ShowSoReply from "./ShowSoReply";
import Card from "../../components/Card";
 
import { useTheme } from "../../theme/ThemeProvider";
import StatusBadge from "../../components/StatusBadge";
import useDateTimeConverter from "../../hooks/useDateTimeConverter";



export default function ShowSo() {
   
    const route = useRoute();
    const { secondOpinion } = route.params;

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
        <SafeAreaContainer screenTitle="Second Opinion"
            allowedBack={true}>

            <Card

                titleSeperator={true}
                subTitle={secondOpinion?.created_at}
                title={`Second Opinion #${secondOpinion.id} `}>
                {secondOpinion?.subject &&
                    <View style={styles.subjectWrapper}>
                        <Text style={styles.subject}>{secondOpinion?.subject}</Text>

                    </View>
                }

                {secondOpinion?.description &&
                    <Text style={styles.description}>{secondOpinion?.description}</Text>
                }


                {/* <Text>

                    {JSON.stringify(secondOpinion, null, 2)}

                </Text> */}

                <View style={[styles.infoContainer]}>
                    <Text style={[styles.text]}>
                        Last Visit
                    </Text>
                    <Text  >
                        {secondOpinion?.last_visit}
                    </Text>
                </View>

                <View style={[styles.infoContainer]}>
                    <Text style={[styles.text]}>
                        Status
                    </Text>
                    <Text  >
                        <StatusBadge status={secondOpinion?.status} />
                    </Text>
                </View>

                {/* <Text>{JSON.stringify(secondOpinion?.last_visit, null, 2)}</Text> */}
            </Card>
 
            {(secondOpinion?.replies && (secondOpinion?.status === "closed" || secondOpinion?.status === "answered")) &&
                <ShowSoReply
                    reply={secondOpinion?.replies}
                />
            }



        </SafeAreaContainer>
    )
}