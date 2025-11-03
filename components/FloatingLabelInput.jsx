import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

const FloatingLabelInput = ({ label, textChange, value,
  placeholder = "", keyboardType = "default", required = false,
  multiline = false, showMax = false, maxLength = 100,

  validate, // ✅ new prop: function or regex for validation
  errorMessage, // ✅ new prop: optional custom error text

}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();

  const [error, setError] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      paddingTop: 18,
      marginVertical: 10,
    },
    label: {
      // width:"100%",
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

    multilineinput: {
      height: 144,

    },



    inputFocused: {
      borderBottomWidth: 1,
      borderColor: theme.primary
    },
    required: {
      color: (isFocused || value) ? theme.danger : '#999'
    },

    errorText: {
      color: theme.danger,
      fontSize: 13,
      marginTop: 4,
      fontFamily: theme.font400,
    },

  });
  useEffect(() => {
    // Run validation when value changes
    if (validate) {
      if (typeof validate === 'function') {
        const valid = validate(value);
        setError(valid ? '' : errorMessage || `${label} is invalid`);
      } else if (validate instanceof RegExp) {
        setError(validate.test(value) ? '' : errorMessage || `${label} is invalid`);
      }
    } else if (required && !value) {
      setError(`${label} is required`);
    } else {
      setError('');
    }
  }, [value, validate]);

  return (
    <View style={styles.container}>

      <Text style={[styles.label, (isFocused || value) && styles.labelFocused]}>
        {label} {required && <Text style={styles.required}>*</Text>}      {showMax && <Text style={{ alignSelf: "flex-end" }}> {value?.length}/{maxLength} </Text>}
      </Text>





      <TextInput
        style={[styles.input, isFocused && styles.inputFocused, (value?.length > 24) && multiline && styles.multilineinput]}
        value={value}
        onChangeText={textChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType={keyboardType}
        multiline={multiline}

      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default FloatingLabelInput;
