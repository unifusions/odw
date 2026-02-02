

import { View} from "react-native";



import { useFonts, Manrope_500Medium, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from "@expo-google-fonts/manrope";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { AuthProvider, useAuth } from "./context/AuthContext";

import { ThemeProvider } from "./theme/ThemeProvider";
import AuthStackNavigation from "./navigation/AuthStackNavigation";
import BookingNavigator from "./navigation/BookingNavigator";
import { BookingProvider } from "./context/BookingContext";
import useSettings from "./hooks/useSettings";
import UpdateApp from "./screens/UpdateApp";
import LoadingDotsWithOverlay from "./components/LoadingDotsWithOverlay";
import { useEffect } from "react";
 
import UpdateCheck from "./screens/UpdateCheck";


export default function App() {
  let [fontsLoaded] = useFonts({
    Manrope_700Bold, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold
  });
  const { settings, loading } = useSettings();
  const appVersion = settings?.settings?.find(item => item.key === "app_version");
  const currentVersion = "1.1";
  const AppNavigator = () => {
 
    const { token, setToken, setUser, checkUser } = useAuth();
    const Stack = createStackNavigator();
    useEffect(() => {

      // AsyncStorage.clear();
      checkUser();
    }, []);

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


 

    );
  } 

  return (
    <> 
   
      < ThemeProvider >
        {

          fontsLoaded ?
            (!loading ? 
              (!(appVersion?.value === currentVersion) ? <>
                <UpdateApp />
              </> :
                <AuthProvider>


                  <BookingProvider>
                    <AppNavigator />
                  </BookingProvider>
 
                </AuthProvider >
              ) : <UpdateCheck />) :

             <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LoadingDotsWithOverlay />
        </View>
        }

      </ThemeProvider>
    </>

  );
}