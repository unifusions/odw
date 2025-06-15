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
import SecondOpinion from "../screens/SecondOpinion/SecondOpinion";
import AppointmentScreen from "../screens/Appointment/AppointmentScreen";



const Tab = createBottomTabNavigator();


export default function BottomTabNavigator() {




    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => {
                    let IconComponent;

                    if (route.name === "Home") {
                        IconComponent = HomeIcon;
                    } else if (route.name === "Appointments") {
                        IconComponent = CalendarDaysIcon;
                    } else if (route.name === "Compare") {
                        IconComponent = BanknotesIcon;
                    } else if (route.name === "Profile") {
                        IconComponent = UserIcon;
                    }

                    return <IconComponent size={size} color={color} />;
                },
                tabBarActiveTintColor: "#5082FE", // Dark blue
                tabBarInactiveTintColor: "#475F73", // Grayish blue
            })}>
            <Tab.Screen name="Home" component={HomeStackNavigator}></Tab.Screen>
            <Tab.Screen name="Appointments" component={AppointmentScreen} ></Tab.Screen>
            {/* <HomeStack.Screen name="AppointmentScreen" component={}/> */}
            <Tab.Screen name="Compare" component={CompareScreen} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator}></Tab.Screen>

        </Tab.Navigator>
    )
}