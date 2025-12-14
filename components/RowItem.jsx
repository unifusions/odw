import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

const RowItem = ({ title, subTitle, icon }) => {

    const { theme } = useTheme();
    const styles = StyleSheet.create({
        rowContainer: {
            width: "100%",
            display: "flex", flexDirection: "row",
            paddingVertical: 8,
            marginVertical: 8,
            alignItems: "center"
        },

        infoContainer: {
            marginStart: 16,
            flex:1

        },

        rowTitle: {
            fontFamily: theme.font700,
            flexWrap: "wrap",
            // marginBottom: 8
        },

        rowSubtitle: {
            marginTop: 8,
            color: theme.gray
        },

        iconContainer: {
            padding: 0
        }
    });

    return (
        <>
            <View style={styles.rowContainer}>
                {icon

                }
                <View style={styles.infoContainer}>
                    <Text style={styles.rowTitle}>{title}</Text>
                    {subTitle && <Text style={styles.rowSubtitle}>{subTitle}</Text>}
                </View>
            </View>
        </>
    )
}

export default RowItem;