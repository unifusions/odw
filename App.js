import "@expo/metro-runtime";
import { useFonts, Manrope_500Medium, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from "@expo-google-fonts/manrope";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LoginScreen from "./screens/Auth/LoginScreen";
import { ThemeProvider } from "./theme/ThemeProvider";
import AuthStackNavigation from "./navigation/AuthStackNavigation";
import BookingScreen from "./screens/Appointment/BookingScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    Manrope_700Bold, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold
  });
  const Stack = createStackNavigator();
  return (

    // <NavigationContainer>

    //   {/* <BottomTabNavigator /> */}
    // </NavigationContainer>

    <ThemeProvider>
      <NavigationContainer>

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OtpScreen" component={AuthStackNavigation} />
          <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
        </Stack.Navigator>

        {/* <HomeScreen /> */}
      </NavigationContainer>
    </ThemeProvider>


  );
}
const MainScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}