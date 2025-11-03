import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

const PhoneInput = ({ label, onChange, required = false }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            paddingTop: 18,
            marginVertical: 8,
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
        },



        inputFocused: {
            borderBottomWidth: 1,
            borderColor: theme.primary
        },
        required: {
            color: (isFocused || inputValue) ? theme.danger : '#999'
        },

        inputError: {
            borderColor: 'red',
        },
        errorText: {
            marginTop: 4,
            color: 'red',
            fontSize: 13,
            fontFamily: theme.font400
        },
    });

    // Format number as +1 (XXX) XXX-XXXX
    const formatUSPhoneNumber = (text) => {
        const digits = text.replace(/\D/g, '');
        let number = digits.startsWith('1') ? digits.slice(1) : digits;
        number = number.slice(0, 10);

        let formatted = '';
        if (number.length > 0) {
            formatted = '+1 ';
            if (number.length <= 3) {
                formatted += `(${number}`;
            } else if (number.length <= 6) {
                formatted += `(${number.slice(0, 3)}) ${number.slice(3)}`;
            } else {
                formatted += `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
            }
        }
        return formatted;
    };

    const validate = (value) => {
        if (!value.trim() && required) {
            return { isValid: false, error: 'Phone Number is required.' };
        }


        const digits = value.replace(/\D/g, '');

        if (digits.length !== 11) {
            return { isValid: false, error: 'Please enter a valid 10-digit US phone numbers' };
        }
        return { isValid: true, error: '' };
    };

    const handleChange = (text) => {
        let formattedValue = text;

        // Detect numeric input
        if (/^[\d\s()+-]+$/.test(text)) {
            formattedValue = formatUSPhoneNumber(text);
        }

        setInputValue(formattedValue);

        const { isValid: valid, error: validationError } = validate(formattedValue);
        setIsValid(valid);
        setError(validationError);

        // Pass new state to parent immediately
        if (onChange) onChange({ value: formattedValue, isValid: valid });
    };


    return (

        <View style={styles.container}>
            {label && <Text style={[styles.label, (isFocused || inputValue) && styles.labelFocused]}>
                {label} {required && <Text style={styles.required}>*</Text>}
            </Text>}






            <TextInput
                style={[styles.input, isFocused && styles.inputFocused, error ? styles.inputError : null]}
                value={inputValue}
                onChangeText={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType="number-pad"


            />
            {!!error && <Text style={styles.errorText}>{error}</Text>}
        </View>

    );
};



export default PhoneInput;
