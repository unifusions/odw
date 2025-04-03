import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/Profile/SettingsScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import ClinicBookingScreen from "../screens/Appointment/ClinicBookingScreen";

const BookingStack = createStackNavigator();

export default function BookingStackNavigator(){
    return(
        <BookingStack.Navigator screenOptions={{ headerShown:false }}>
            <BookingStack.Screen name="BookingScreen" component={BookingStackNavigator} />
            <BookingStack.Screen name="ClinicBooking" component={ClinicBookingScreen}/>
         
        </BookingStack.Navigator>
    )
}