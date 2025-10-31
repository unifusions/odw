import { useContext } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ArrowUpRightIcon } from "react-native-heroicons/outline";
import { ThemeContext } from "../../theme/ThemeProvider";

export default function HomeCard({ navigation }) {

    const { theme } = useContext(ThemeContext);
    const { height, width } = Dimensions.get('window');
    const styles = StyleSheet.create({

        scrollView: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 12
        },
        card: {
            height: (width / 2.75),
            width: (width / 2),
            borderRadius: 12,
            padding: 12,
            justifyContent: "space-between",
            marginEnd: 16
        },
        title: {
            fontSize: 20,
            color: "#000",
            fontFamily: theme.font400
        },
        subtitle: {
            fontSize: 14,
            color: "#000",
            fontFamily: theme.font400
        },
        iconContainer: {
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Light grey circle
            borderRadius: 20,
            width: 32,
            height: 32,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
        },
        pastelPurple: {
            backgroundColor: "#BEC8F9"
        },

        pastelGreen: {
            backgroundColor: "#C9E0DD"
        },

        pastelPink: {
            backgroundColor: '#F4E7E0'
        },
        pastelViolet: {
            backgroundColor: '#bde0fe'
        }
    })
    return (
        <>
            <ScrollView horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
            >
                <TouchableOpacity style={[styles.card, styles.pastelPurple]}
                    onPress={() => navigation.navigate('Home', { screen: "Estimate" })}
                >

                    <Text style={styles.title}>
                        Cost {"\n"}Estimate
                    </Text>
                    <Text style={styles.subtitle}>See Real Pricing Before you book</Text>
                    <View style={styles.iconContainer}>
                        <ArrowUpRightIcon size={20} color="#5A5A5A" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, styles.pastelViolet]}
                    onPress={() => navigation.navigate('Home', { screen: "SecondOpinion" })}
                >
                    <Text style={styles.title}>
                        Second {"\n"}Opinion
                    </Text>
                    <Text style={styles.subtitle}>Not sure about treatment? Let us
                        review</Text>
                    <View style={styles.iconContainer}>
                        <ArrowUpRightIcon size={20} color="#5A5A5A" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, styles.pastelPink]}
                    onPress={() => navigation.navigate('Book')}
                >
                    <Text style={styles.title}>
                        Book an {"\n"}Appointment
                    </Text>
                    <Text style={styles.subtitle}>Book confidently with One
                        Dental World Experience</Text>
                    <View style={styles.iconContainer}>
                        <ArrowUpRightIcon size={20} color="#5A5A5A" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.card, styles.pastelGreen]}
                    onPress={() => navigation.navigate('Compare')}
                >
                    <Text style={styles.title}>
                        Compare {"\n"}Costs
                    </Text>
                    <Text style={styles.subtitle}>See how our prices stack up nationally</Text>
                    <View style={styles.iconContainer}>
                        <ArrowUpRightIcon size={20} color="#5A5A5A" />
                    </View>
                </TouchableOpacity>


            </ScrollView>


        </>
    )
}