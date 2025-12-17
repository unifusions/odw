 
import { StyleSheet, View, Text } from "react-native";
import {   useTheme } from "../theme/ThemeProvider";

export default function Card({ preTitle = false ,title = '', subTitle ='', titleSeperator = false, children }) {


    const { theme } = useTheme();
    const styles = StyleSheet.create(
        {
            card: {
                padding: 8,
                backgroundColor: theme.cardBackground,
                marginBottom: 16,
                borderRadius: 8,
                width: "100%",
                // flex:1,


                // borderWidth: 1,
                // borderColor: theme.border
            },
            titleView: {
                paddingVertical: 8,
                // paddingHorizontal: 8
            },
            title: {
                fontFamily: theme.font600,
                fontSize: 18,

            },
            subTitle: {
                fontFamily: theme.font400,
                fontSize: 14,
                color: theme.mutedText
            },
            cardBody: {
                paddingHorizontal: 8,
                // flex:1
            },
            seperator: {
                width: "100%",
                height: 1,
                backgroundColor: theme.border,
                marginVertical: 12
            }
        }
    );
    return (
        <View style={styles.card}>
            
            {title && <View style={styles.titleView}>

                <Text style={styles.title}> {title}</Text>
                {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
                {titleSeperator && <View style={styles.seperator}></View>}
            </View>}

            <View style={styles.cardBody}>
                {children}
            </View>

        </View>
    )
}