import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, Platform, Modal, SafeAreaView } from 'react-native';
import { ThemeContext } from '../theme/ThemeProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';

const FloatingDatePicker = ({ label, textChange, value }) => {
    const [isFocused, setIsFocused] = useState(false);
    const { theme } = useContext(ThemeContext);
    const [showPicker, setShowPicker] = useState(false);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const handleOpenPicker = () => {
        setIsFocused(true);
        setShowCalendarModal(true);
    };

    const handleSelectDate = (dateString) => {
        // dateString will be in 'YYYY-MM-DD' format from react-native-calendars
        const newDate = new Date(dateString);
        // setSelectedDate(newDate);
        textChange(newDate.toLocaleDateString()); // Pass back formatted string (e.g., "6/21/2025")
        setShowCalendarModal(false);
        setIsFocused(false); // Remove focus when picker is closed
    };

    const handleCancel = () => {
        setShowCalendarModal(false);
        setIsFocused(false); // Remove focus when picker is cancelled
    };
    const styles = StyleSheet.create({
        container: {
            paddingTop: 18,
            marginVertical: 10,
        },
        label: {
            position: 'absolute',
            left: 0,
            top: 30,
            fontSize: 16,
            color: '#999',
            zIndex: 1,
            fontFamily: theme.font500
        },
        labelFocused: {
            top: 0,
            fontSize: 14,
            color: '#666',
        },
        input: {
            height: 48,
            borderBottomWidth: 1,
            borderColor: '#ccc',
            fontFamily: theme.font700,
            paddingHorizontal: 0,
            fontSize: 24,
            color: '#222',
            backgroundColor: '#fff',
            flex: 1,
            width: "100%"
        },

        inputFocused: {
            borderBottomWidth: 1,
            borderColor: theme.primary
        },
        modalContent: {

            alignSelf: "center",
            backgroundColor: theme.background,
            borderRadius: 10,
            width: '90%',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            
        }
    });


    return (
        <View style={styles.container}>
            <Text style={[styles.label, (isFocused || value) && styles.labelFocused]}>
                {label}
            </Text>

            <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                value={value}
                onPress={handleOpenPicker}
                // onChangeText={textChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType="email-address"
            />


            <Modal
                animationType="fade" // Or "slide"
                transparent={true}
                visible={showCalendarModal}
                onRequestClose={handleCancel} // For Android back button
            >
                <SafeAreaView style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={styles.modalContent}>
                        <Calendar
                            onDayPress={(day) => handleSelectDate(day.dateString)}
                        />
                    </View>
                </SafeAreaView>

            </Modal>



        </View>
    );
};

export default FloatingDatePicker;
