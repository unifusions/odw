import { createStackNavigator } from "@react-navigation/stack";
import { ThemeContext, ThemeProvider } from "../theme/ThemeProvider";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/Auth/LoginScreen";
import OtpScreen from "../screens/Auth/OtpScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";


const AuthStack = createStackNavigator();

export default function AuthStackNavigation() {

    const { theme } = useContext(ThemeContext);
    return (

        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="AuthOtp" component={OtpScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />

        </AuthStack.Navigator>
 

    )
}
