import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { ThemeProvider, ThemeContext } from "../theme/ThemeProvider";
import { useContext, useEffect, useState } from "react";
import SettingsScreen from "../screens/SettingsScreen";
import { HomeIcon, CalendarDaysIcon, BanknotesIcon, UserIcon } from "react-native-heroicons/outline"; // Import icons
import ProfileStackNavigator from "./ProfileStackNavigator";
import BookingScreen from "../screens/Appointment/BookingScreen";
import HomeStackNavigator from "./HomeStackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import BookingStackNavigator from "./BookingStackNavigator";
import CompareScreen from "../screens/CompareScreen";

// import {} from "react-native-heroicons"

const Tab = createBottomTabNavigator();


export default function BottomTabNavigator() {

    const navigation = useNavigation();
    const[userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {

    //     const checkToken = async () => {
    //         try {
    //             const token = await AsyncStorage.getItem('authToken');
    //             setUserToken(token);
    //             if (!token) {
    //                 navigation.reset({
    //                     index: 0,
    //                     routes: [{ name: 'AuthStack' }],
    //                 })
    //             }
    //         } catch (error) {
    //             console.error('Error checking token:', error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     checkToken();
    // }, []);
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => {
                    let IconComponent;

                    if (route.name === "Home") {
                        IconComponent = HomeIcon;
                    } else if (route.name === "Calendar") {
                        IconComponent = CalendarDaysIcon;
                    } else if (route.name === "Compare") {
                        IconComponent = BanknotesIcon;
                    } else if (route.name === "Profile") {
                        IconComponent = UserIcon;
                    }

                    return <IconComponent size={size} color={color} />;
                },
                tabBarActiveTintColor: "#1E3A8A", // Dark blue
                tabBarInactiveTintColor: "#64748B", // Grayish blue
            })}>
            <Tab.Screen name="Home" component={HomeStackNavigator}></Tab.Screen>
            <Tab.Screen name="Calendar" component={BookingStackNavigator} />
            <Tab.Screen name="Compare" component={CompareScreen} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator}></Tab.Screen>

        </Tab.Navigator>
    )
}