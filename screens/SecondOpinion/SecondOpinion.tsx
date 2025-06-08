import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenHeader from "../../components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
const SecondOpinion = () => {
    const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);

    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
        <SafeAreaView style={[ styles.safeAreaContainer]}>
        <ScreenHeader title="Second Opinion"
    onBackPress={() => navigation.goBack()}
                    />

          <ScrollView showsVerticalScrollIndicator={false}>
  
            <Text>
              Second Opinion
            </Text>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
};

export default SecondOpinion;
