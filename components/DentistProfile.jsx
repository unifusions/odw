

import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ChatBubbleBottomCenterIcon, ClockIcon, MapIcon, StarIcon, UserIcon } from "react-native-heroicons/outline";
import { practiseYearCalculator } from "../helpers/practiseyears";
import { useTheme } from "../theme/ThemeProvider";
import Card from "./Card";

export default function DentistProfile({ dentist }) {
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        iconContainer: {
            alignContent: "center",
            alignItems: "center"
        },

        iconText: {
            fontFamily: theme.font700,
            fontSize: 16,
            color: theme.primary
        },
        iconSubTitle: {
            fontFamily: theme.font500,
            color: theme.grey
        },
        iconWrapper: {
            backgroundColor: theme.primary,

            height: 40,
            width: 40,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            marginBottom: 5
        },
        servicesPill: {
            paddingVertical: 3,
            paddingHorizontal: 5,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 16,
            margin: 4,
            fontFamily: theme.font500,
            fontSize: 12,
        }
    });

    return (
        <>
            <Card style={{ flex: 1, }}>
                <View style={{
                    flexDirection: "row", alignContent: "flex-start",
                    alignItems: "center",
                    paddingVertical: 8,
                    flex: 1
                }}>
                    <Image source={{ uri: dentist.photo_url }} height={125}
                        width={125} style={{ borderRadius: 20, marginEnd: 16 }}
                    />
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: theme.border, paddingBottom: 6, marginBottom: 6 }}>
                            <Text style={{
                                fontFamily: theme.font700, fontSize: 16, flexWrap: "wrap", flexShrink: 1,
                                ellipsizeMode: "tail",
                            }}>{dentist?.name}</Text>
                            <Text style={{ fontFamily: theme.font400, fontSize: 16 }}>{practiseYearCalculator(dentist?.practise_from)} years of Practise</Text>

                        </View>

                        <View style={{ flexDirection: "row", paddingTop: 6, alignItems: "center" }}>
                            <MapIcon size={20} style={{ marginEnd: 6 }} />
                            <Text style={{ fontFamily: theme.font400, fontSize: 16 }}>Heavenly Smiles</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}>
                    {dentist?.services?.map((service, index) => <Text
                        key={index}
                        style={styles.servicesPill}
                    >{service.name}</Text>)}
                </View>
            </Card>

            <View style={{
                flexDirection: "row",
                padding: 8,
                justifyContent: "space-between",
                marginBottom: 16,
            }}>




                <View style={styles.iconContainer}>
                    <View style={styles.iconWrapper}>
                        <UserIcon size={20} color={theme.white} />

                    </View>
                    <Text style={styles.iconText}>{dentist.no_of_patients ?? 0}</Text>
                    <Text style={styles.iconSubTitle}>Patients</Text>
                </View>
                <View style={styles.iconContainer}>
                    <View style={styles.iconWrapper}>
                        <ClockIcon size={20} color={theme.white} />
                    </View>
                    <Text style={styles.iconText}>{practiseYearCalculator(dentist?.practise_from)} + </Text>
                    <Text style={styles.iconSubTitle}>Experience</Text>
                </View>
                <View style={styles.iconContainer}>
                    <View style={styles.iconWrapper}>
                        <StarIcon size={20} color={theme.white} />

                    </View>
                    <Text style={styles.iconText}>{dentist.rating ?? 0}</Text>
                    <Text style={styles.iconSubTitle}>Rating</Text>
                </View>

                <View style={styles.iconContainer}>
                    <View style={styles.iconWrapper}>
                        <ChatBubbleBottomCenterIcon size={20} color={theme.white} />
                    </View>
                    <Text style={styles.iconText}>{dentist.no_of_reviews ?? 0}</Text>
                    <Text style={styles.iconSubTitle}>Reviews</Text>
                </View>

            </View>
            {dentist?.about && <Card title="About">
                <Text>{dentist.about}</Text>
            </Card>}

        </>
    )
}