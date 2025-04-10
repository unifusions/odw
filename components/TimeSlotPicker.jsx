import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet, Dimensions
} from "react-native";

const generateTimeSlots = (start = "12:00", end = "20:00", interval = 30) => {
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
        currentTime.setMinutes(currentTime.getMinutes() + 30); // Assuming 30-minute intervals
    }

    return slots;
};

const TimeSlotPicker = ({ start, end, selectedTimeSlot, handleSelect }) => {
    const screenWidth = Dimensions.get("window").width;
    const numColumns = 5; // Max slots per row
    const slotWidth =( screenWidth / numColumns )- 22;
    const [selectedSlot, setSelectedSlot] = useState(null);
    const timeSlots = generateTimeSlots(start, end);


    const renderItem = ({ item }) => {
        const isSelected = item === selectedTimeSlot;
        return (
            <TouchableOpacity
                style={[styles.slot, { width: slotWidth }, isSelected && styles.selectedSlot]}
                onPress={() => handleSelect(item)}
            >
                <Text style={[styles.slotText, isSelected && styles.selectedSlotText]}>
                    {item}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Time</Text>
            <View style={styles.slotContainer}>
                {timeSlots.map((item) => renderItem({ item }))}</View>
            {/* <FlatList
                data={timeSlots}
                keyExtractor={(item) => item}
                numColumns={4} // Maximum 4 slots per row
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const isSelected = item === selectedSlot;
                    return (
                        <TouchableOpacity
                            style={[styles.slot, { width: slotWidth }, isSelected && styles.selectedSlot]}
                            onPress={() => setSelectedSlot(item)}
                        >
                            <Text style={[styles.slotText, isSelected && styles.selectedSlotText]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 10,

    },
    slotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2d3748",
        marginBottom: 10,
    },
    list: {
        alignItems: "center",
    },
    slot: {
        // width: 80,

        height: 40,
        justifyContent: 'center',
        paddingVertical: 10,
        // paddingHorizontal:2,
        margin: 5,
        borderWidth: 1,
        borderColor: "#3B4F66",
        alignItems: "center",
    },
    selectedSlot: {
        backgroundColor: "#3B4F66",
    },
    slotText: {
        fontSize: 14,
        color: "#3B4F66",
    },
    selectedSlotText: {
        color: "#58D3F7",
    },
});

export default TimeSlotPicker;
