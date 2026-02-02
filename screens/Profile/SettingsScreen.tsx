import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import ScreenHeader from "../../components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { CalendarIcon } from "react-native-heroicons/outline";

import * as Notifications from 'expo-notifications';

const SettingsScreen = () => {
    const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    const navigation = useNavigation();
const  [status, setStatus]  = useState(null);
    useEffect(() => {
        const checkStatus = async () => {
          const { status } = await Notifications.getPermissionsAsync();
          setStatus(status); // Update state with the actual string (e.g., 'granted')
        };
    
        checkStatus();
      }, []); // Empty dependency array means this runs once
    return (
        <>

            <SafeAreaProvider>

                <SafeAreaView style={styles.safeAreaContainer} >


                    <ScreenHeader
                        title="Settings"
                        onBackPress={() => navigation.goBack()}
                        RightIcon={CalendarIcon} // Optional Right Icon
                        onRightPress={() => console.log("Calendar Pressed")}
                    />
                    <View style={styles.container} >
                        
<Text >Permission Status: {status}</Text>
                        <TouchableOpacity style={styles.button} onPress={toggleTheme}>
                            <Text style={styles.buttonText}>Toggle Theme</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={resetTheme}>
                            <Text style={styles.buttonText}>Reset to System Theme</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </SafeAreaProvider>
        </>

    );
};

export default SettingsScreen;
