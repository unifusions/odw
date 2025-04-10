import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import ScreenHeader from "../components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { CalendarIcon } from "react-native-heroicons/outline";

const CompareScreen = () => {
  const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
  const styles = getGlobalStyles(theme);

  return (
    <View style={styles.container}>
      
    <Text>
        CompareScreen
    </Text>
    </View>
  );
};

export default CompareScreen;
