import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import ScreenHeader from "../components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { CalendarIcon } from "react-native-heroicons/outline";

const SettingsScreen = () => {
  const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
  const styles = getGlobalStyles(theme);

  return (
    <View style={styles.container}>
      
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
