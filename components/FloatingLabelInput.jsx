import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { ThemeContext } from '../theme/ThemeProvider';

const FloatingLabelInput = ({ label, textChange, value }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useContext(ThemeContext);


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
    },

    inputFocused: {
      borderBottomWidth: 1,
      borderColor: theme.primary
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
        onChangeText={textChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType="email-address"
      />
    </View>
  );
};

export default FloatingLabelInput;
