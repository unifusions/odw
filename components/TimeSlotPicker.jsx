import React, { useContext, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from "react-native";
import { ThemeContext, useTheme } from "../theme/ThemeProvider";

const generateTimeSlots = (start = "12:00", end = "20:00",
    interval = 30) => {
    const slots = [];
    let currentTime = new Date();

    const [startHour, startMinute] = start.split(":").map(Number);
    currentTime.setHours(startHour, startMinute, 0);

    const endTime = new Date(currentTime);
    const [endHour, endMinute] = end.split(":").map(Number);
    endTime.setHours(endHour, endMinute, 0);

    while (currentTime <= endTime) {
        slots.push(
            currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
        );
        currentTime.setMinutes(currentTime.getMinutes() + interval); // Use the interval parameter
    }

    return slots;
};

const TimeSlotPicker = ({ start, end, selectedTimeSlot, handleSelect, disabled=false }) => {
    const [selectedSlot, setSelectedSlot] = useState(selectedTimeSlot || null); // Initialize with prop
    const timeSlots = generateTimeSlots(start, end);

    const { theme } = useTheme();
    // This function will be called by the parent component, so we should call handleSelect when a slot is pressed
    const handleSlotPress = (item) => {

        if (disabled) return; // Do nothing if picker is disabled
        setSelectedSlot(item);
        if (handleSelect) {
            handleSelect(item);
        }

        setSelectedSlot(item);
        if (handleSelect) {
            handleSelect(item);
        }
    };



    const styles = StyleSheet.create({
        container: {
            marginVertical: 10,
            // paddingHorizontal: 10,
        },
        title: {
            fontSize: 16,
            fontFamily: theme.font700,
            color: "#2d3748",
            marginBottom: 10,
        },
        list: {
            justifyContent: "space-between",
        },
        slot: {
            flex: 1, // Distribute available space evenly
            minWidth: '23%', // A bit less than 25% to account for horizontal padding/margin in FlatList items
            margin: 4, // Smaller margin for better fit and even spacing
            paddingVertical: 10,
            paddingHorizontal: 6,
            borderWidth: 1,
            borderColor: "#3B4F66",
            alignItems: "center",
            justifyContent: "center", // Center text vertically
        },
        selectedSlot: {
            backgroundColor: "#3B4F66",
        },
        slotText: {
            fontSize: 14,
            fontFamily: theme.font500,
            color: "#3B4F66",
            textAlign: 'center', // Ensure text is centered
        },
        selectedSlotText: {
            color: "#58D3F7",
            fontFamily: theme.font700,
        },
        disabledSlot: {
            backgroundColor: "#f2f2f2",
            borderColor: "#ccc",
        },
        disabledSlotText: {
            color: "#999",
            fontFamily: theme.font500,
        },
    });
    const numColumns = 4; // Sticking to 4 columns as per your FlatList prop

    const renderItem = ({ item }) => {
        const isSelected = item === selectedSlot;
        return (
            <TouchableOpacity
                style={[styles.slot, isSelected && styles.selectedSlot,  disabled && styles.disabledSlot, ]}
                onPress={() => handleSlotPress(item)}
                activeOpacity={disabled ? 1 : 0.7} 
            >
                <Text style={[styles.slotText, isSelected && styles.selectedSlotText,   disabled && styles.disabledSlotText,]}>
                    {item}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title]}>Available Time</Text>
            <FlatList
                data={timeSlots}
                keyExtractor={(item) => item}
                numColumns={numColumns}
                contentContainerStyle={styles.list}
                renderItem={renderItem}
            />
        </View>
    );
};


export default TimeSlotPicker;