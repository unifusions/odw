import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../theme/ThemeProvider';
import DateTimePicker, { useDefaultStyles } from 'react-native-ui-datepicker';
import { format, parse } from 'date-fns';

const FloatingDatePicker = ({ label, textChange, value, mode = "single", required=false }) => {
  const defaultStyles = useDefaultStyles();
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const handleOpenPicker = () => {
    setIsFocused(true);
    setShowCalendarModal(true);
  };

  // When user selects a date
  const handleSelectDate = (date) => {
    if (!date) return;
    const dbFormat = format(new Date(date), 'yyyy-MM-dd'); // for DB
    textChange(dbFormat); // send back to parent in DB format
    setShowCalendarModal(false);
    setIsFocused(false);
  };

  const handleCancel = () => {
    setShowCalendarModal(false);
    setIsFocused(false);
  };

  // Convert DB string (yyyy-MM-dd) to Date
  const getPickerDate = (val) => {
    if (!val) return new Date();
    if (typeof val === 'string') {
      try {
        return parse(val, 'yyyy-MM-dd', new Date());
      } catch {
        return new Date();
      }
    }
    return new Date();
  };

  // Display format for input (MM-dd-yyyy)
  const getDisplayValue = (val) => {
    if (!val) return '';
    try {
      const d = parse(val, 'yyyy-MM-dd', new Date());
      return format(d, 'MM-dd-yyyy');
    } catch {
      return '';
    }
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
      fontFamily: theme.font500,
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
      fontSize: 20,
      color: '#222',
      backgroundColor: '#fff',
      flex: 1,
      width: "100%",
    },
    inputFocused: {
      borderBottomWidth: 1,
      borderColor: theme.primary,
    },
    modalContent: {
      alignSelf: "center",
      backgroundColor: theme.background,
      borderRadius: 10,
      width: '90%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    required: {
      color: (isFocused || value) ? theme.danger : '#999'
    }
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.label, (isFocused || value) && styles.labelFocused]}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>

      <TouchableOpacity onPress={handleOpenPicker} activeOpacity={0.8}>
        <TextInput
          style={[styles.input, isFocused && styles.inputFocused]}
          value={getDisplayValue(value)}   // show MM-dd-yyyy in input
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showCalendarModal}
        onRequestClose={handleCancel}
      >
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.modalContent}>
            <DateTimePicker
              mode={mode}
              date={getPickerDate(value)}
              onChange={({ date }) => handleSelectDate(date)}
              styles={{
                ...defaultStyles,
                month_selector_label: { fontFamily: theme.font500, fontSize: 16 },
                year_selector_label: { fontFamily: theme.font500, fontSize: 16 },
                weekday_label: { fontFamily: theme.font500 },
                day_label: { fontFamily: theme.font500 },
                month_label: { fontFamily: theme.font500 },
                year_label: { fontFamily: theme.font500 },
                selected: { backgroundColor: theme.primary },
                selected_label: { color: 'white', fontFamily: theme.font700 },
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default FloatingDatePicker;
