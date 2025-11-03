

import { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";



import { useFonts, Manrope_500Medium, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from "@expo-google-fonts/manrope";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { AuthContext, AuthProvider, useAuth } from "./context/AuthContext";

import { ThemeProvider } from "./theme/ThemeProvider";
import AuthStackNavigation from "./navigation/AuthStackNavigation";
import BookingNavigator from "./navigation/BookingNavigator";
import { BookingProvider } from "./context/BookingContext";
import useSettings from "./hooks/useSettings";
import UpdateApp from "./screens/UpdateApp";
import LoadingDotsWithOverlay from "./components/LoadingDotsWithOverlay";


export default function App() {
  let [fontsLoaded] = useFonts({
    Manrope_700Bold, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold
  });
  const { settings, loading } = useSettings();
  const appVersion = settings?.settings?.find(item => item.key === "app_version");
  const currentVersion = "1.0";
  const AppNavigator = () => {

    const { token } = useAuth();
    const Stack = createStackNavigator();

    return (
      <>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {token ? (
              <>
                <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
                <Stack.Screen name="BookingFlow" component={BookingNavigator} options={{ headerShown: false }} /></>
            ) : (
              <Stack.Screen name="AuthStack" component={AuthStackNavigation} />
            )}
          </Stack.Navigator>
        </NavigationContainer>


      </>



      // 

    );
  }

  // if (!(appVersion?.value === currentVersion)) {
  //   return (
  //     <UpdateApp />
  //   )
  // }
  return (
    <>
      < ThemeProvider >
        {
          fontsLoaded ?
            <AuthProvider>


              <BookingProvider>
                <AppNavigator />
              </BookingProvider>



            </AuthProvider > : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" />
            </View>
        }
      </ThemeProvider>
    </>

  );
}