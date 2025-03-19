import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet, Dimensions
} from "react-native";

const generateTimeSlots = (start = "09:00 AM", end = "06:00 PM", interval = 30) => {
    const slots = [];
    let currentTime = new Date();

    // Convert start time to Date object
    const [startHour, startMinute, startPeriod] = start.match(/(\d+):(\d+) (\w+)/).slice(1);
    currentTime.setHours(
        startPeriod === "PM" ? parseInt(startHour) + 12 : parseInt(startHour),
        parseInt(startMinute),
        0
    );

    const endTime = new Date(currentTime);
    const [endHour, endMinute, endPeriod] = end.match(/(\d+):(\d+) (\w+)/).slice(1);
    endTime.setHours(
        endPeriod === "PM" ? parseInt(endHour) + 12 : parseInt(endHour),
        parseInt(endMinute),
        0
    );

    while (currentTime <= endTime) {
        slots.push(currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
        currentTime.setMinutes(currentTime.getMinutes() + interval);
    }

    return slots;
};

const TimeSlotPicker = () => {
    const screenWidth = Dimensions.get("window").width;
    const numColumns = 4; // Max slots per row
    const slotWidth = screenWidth / numColumns - 23;
    const [selectedSlot, setSelectedSlot] = useState(null);
    const timeSlots = generateTimeSlots();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Time</Text>
            <FlatList
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
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 10,
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
        paddingVertical: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "#3B4F66",
        // borderRadius: 5,
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
