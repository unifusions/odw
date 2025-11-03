import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

const EmailOrPhoneInput = ({ label, onChange, required = false }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: { marginVertical: 10, width: "100%", },
        label: {
            marginBottom: 6,
            fontFamily: theme.font500,
            textAlign: "center"
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
            fontFamily: theme.font500,
            textAlign:"center",
            height: 50,
        },
        inputError: {
            borderColor: 'red',
        },
        errorText: {
            marginTop: 4,
            color: 'red',
            fontSize: 13,
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
          return { isValid: false, error: 'This field is required.' };
        }
    
        if (value.includes('@')) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return {
            isValid: emailRegex.test(value.trim()),
            error: emailRegex.test(value.trim()) ? '' : 'Please enter a valid email address.',
          };
        }
    
        const digits = value.replace(/\D/g, '');
        
        if (digits.length !== 11) {
          return { isValid: false, error: 'Please enter a valid 10-digit US phone number or email address.' };
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
    const isEmail = inputValue.includes('@');

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                // keyboardType={isEmail ? 'email-address' : 'phone-pad'}
                value={inputValue}
                onChangeText={handleChange}
                placeholder="Enter email or US phone number"
                autoCapitalize="none"
            />
            {!!error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};



export default EmailOrPhoneInput;
