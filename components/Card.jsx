import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ThemeContext } from "../theme/ThemeProvider";

export default function Card({ title, children }) {


    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create(
        {
            card: {
                padding: 8,
                backgroundColor: theme.cardBackground,
                marginBottom: 16,
                borderRadius: 24
                // borderWidth: 1,
                // borderColor: theme.border
            },
            titleView: {
                paddingVertical: 8,
                paddingHorizontal: 8
            },
            title: {
                fontFamily: theme.font600,
                fontSize: 18
            },
            cardBody: {
                paddingHorizontal: 8
            }
        }
    );
    return (
        <View style={styles.card}>
            <View style={styles.titleView}>
                <Text style={styles.title}> {title}</Text>
            </View>
            <View style={styles.cardBody}>
                {children}
            </View>

        </View>
    )
}