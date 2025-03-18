import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { ThemeProvider, ThemeContext } from "../theme/ThemeProvider";
import { useContext } from "react";
import SettingsScreen from "../screens/SettingsScreen";
import { HomeIcon, CalendarDaysIcon, BanknotesIcon, UserIcon } from "react-native-heroicons/outline"; // Import icons
import ProfileStackNavigator from "./ProfileStackNavigator";

// import {} from "react-native-heroicons"

const Tab = createBottomTabNavigator({
    screens: {
        Home: HomeScreen,
        Profile: SettingsScreen,
    }
});

export default function BottomTabNavigator() {
    return (
        <ThemeProvider>

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        let IconComponent;

                        if (route.name === "Home") {
                            IconComponent = HomeIcon;
                        } else if (route.name === "Calendar") {
                            IconComponent = CalendarDaysIcon;
                        } else if (route.name === "Payments") {
                            IconComponent = BanknotesIcon;
                        } else if (route.name === "Profile") {
                            IconComponent = UserIcon;
                        }

                        return <IconComponent size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#1E3A8A", // Dark blue
                    tabBarInactiveTintColor: "#64748B", // Grayish blue
                })}>
                <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
                <Tab.Screen name="Calendar" component={HomeScreen} />
                <Tab.Screen name="Payments" component={HomeScreen} />
                <Tab.Screen name="Profile" component={ProfileStackNavigator}></Tab.Screen>
            </Tab.Navigator>
        </ThemeProvider>
    )
}