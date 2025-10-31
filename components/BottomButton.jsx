import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../theme/ThemeProvider";
import LoadingDots from "./LoadingDots";

export default function BottomButton({ buttonTheme, handlepress, value, processing = false }) {

    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        ctaWrapper: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,

            backgroundColor: "#fff", // Ensure it's visible
            borderTopWidth: 1,
            borderColor: "#E5E7EB",
            paddingHorizontal: '12',
            paddingBottom: 10,
        },
        ctaTouchable: {
            backgroundColor: buttonTheme === "danger" ? theme.danger : theme.primary,
            paddingVertical: 14,
            paddingHorizontal: 20,
            alignItems: "center",
            marginTop: 10,

            width: '100%',

        },

        ctaText: {
            color: theme.white,
            fontSize: 16,
            fontFamily: theme.font600
        }
    })

    return (
        <>
            <View style={styles.ctaWrapper}>
                <TouchableOpacity style={styles.ctaTouchable} onPress={handlepress}>
                    <Text style={styles.ctaText}>{value}</Text>
                </TouchableOpacity>
            </View>
        </>

    )


}

//  return (
//     <>
//     {processing ? <LoadingDots /> :
//         <TouchableOpacity onPress={handlepress} style={{
//             padding: 16, marginBottom: 16, borderRadius: 2,
//             alignItems: "center", backgroundColor: theme.primary,
//             borderStyle: "solid", borderWidth: 1,
//             borderColor: theme.primary
//         }}>
//             <Text style={{ color: theme.white, textAlign: "center", fontFamily: theme.font600 }}>
//                 {value}
//             </Text>
//         </TouchableOpacity>

//     }

// </>

// )