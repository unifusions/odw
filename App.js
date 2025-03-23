import "@expo/metro-runtime";
import { useFonts, Manrope_500Medium, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from "@expo-google-fonts/manrope";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

import { ThemeProvider } from "./theme/ThemeProvider";
import AuthStackNavigation from "./navigation/AuthStackNavigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";


export default function App() {
  let [fontsLoaded] = useFonts({
    Manrope_700Bold, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold
  });
  const Stack = createStackNavigator();

  const { token } = useContext(AuthContext);
  console.log("Token inside AppNavigator:", token); // Debugging: Check if token updates


  const AppNavigator = () => {

    const { token } = useContext(AuthContext);

    console.log("Token inside AppNavigator:", token); // Debugging: Check if token updates

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token ? (
            <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStackNavigation} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (


    <AuthProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>

    </AuthProvider>
  );
}