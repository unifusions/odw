import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeftIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import getGlobalStyles from "../theme/globalStyles";
import { ThemeContext } from "../theme/ThemeProvider";

export default function ScreenHeader({ title, onBackPress, RightIcon }) {
    const { theme } = useContext(ThemeContext);
    
    const globalstyles = getGlobalStyles(theme);
    return (
        <View style={styles.header}>
            {/* Back Button */}
            <TouchableOpacity onPress={onBackPress} style={styles.iconContainer}>
                <ChevronLeftIcon size={22} color="#4A4A4A" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={globalstyles.screenTitle}>{title}</Text>

            {/* Optional Right Icon */}
            {RightIcon ? (
                <TouchableOpacity style={styles.iconContainer}>
                    <RightIcon size={22} color="#4A4A4A" />
                </TouchableOpacity>
            ) : (
                <View style={styles.iconPlaceholder} /> // Placeholder for spacing
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingVertical: 12,
        backgroundColor: "white",
        // borderBottomWidth: 1,
        // borderBottomColor: "#E5E5E5",
    },
    iconContainer: {
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#4A4A4A",
        textAlign: "center",
        flex: 1,
    },
    iconPlaceholder: {
        width: 38, // Same width as the icon to keep spacing even
    },
});
