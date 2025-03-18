import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";

const SettingsScreen = () => {
  const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
  const styles = getGlobalStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>

      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={resetTheme}>
        <Text style={styles.buttonText}>Reset to System Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
