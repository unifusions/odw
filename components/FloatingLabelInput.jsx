import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { ThemeContext } from '../theme/ThemeProvider';

const FloatingLabelInput = ({ label, textChange, value,
  placeholder = "", keyboardType = "default", required = false,
  multiline = false, showMax = false, maxLength = 100 }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useContext(ThemeContext);


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
    }
  });

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
    </View>
  );
};

export default FloatingLabelInput;
