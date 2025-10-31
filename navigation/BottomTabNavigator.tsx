import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "../theme/ThemeProvider";
import { useContext } from "react";
import { HomeIcon, CalendarDaysIcon, BanknotesIcon, UserIcon, InboxIcon } from "react-native-heroicons/outline"; // Import icons
import ProfileStackNavigator from "./ProfileStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import InsuranceStackNavigator from "./InsuranceStackNavigator";
import InboxStackNavigator from "./InboxStackNavigator";
import BookingNavigator from "./BookingNavigator";



const Tab = createBottomTabNavigator();


export default function BottomTabNavigator() {

    const { theme } = useContext(ThemeContext);


    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => {
                    let IconComponent;

                    if (route.name === "Home") {
                        IconComponent = HomeIcon;
                    } else if (route.name === "Book") {
                        IconComponent = CalendarDaysIcon;
                    } else if (route.name === "Insurance") {
                        IconComponent = BanknotesIcon;
                    } else if (route.name === "Profile") {
                        IconComponent = UserIcon;
                    } else if (route.name === "Inbox") {
                        IconComponent = InboxIcon;
                    }

                    return <IconComponent size={size} color={color} />;
                },
                tabBarActiveTintColor: "#5082FE", // Dark blue
                tabBarInactiveTintColor: "#475F73", // Grayish blue
                tabBarLabelStyle: {
                    fontSize: 12, // Set your desired font size
                    fontFamily: theme.font700, // Replace with your font name
                },
            })}>
            <Tab.Screen name="Home" component={HomeStackNavigator}></Tab.Screen>
            {/* <Tab.Screen name="Book" component={AppointmentScreen} ></Tab.Screen> */}
            <Tab.Screen name="Book" component={BookingNavigator} ></Tab.Screen>


            {/* <HomeStack.Screen name="AppointmentScreen" component={}/> */}
            <Tab.Screen name="Insurance" component={InsuranceStackNavigator} />
            <Tab.Screen name="Inbox" component={InboxStackNavigator}></Tab.Screen>
            <Tab.Screen name="Profile" component={ProfileStackNavigator}></Tab.Screen>

        </Tab.Navigator>
    )
}