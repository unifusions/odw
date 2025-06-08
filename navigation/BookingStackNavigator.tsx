import { createStackNavigator } from "@react-navigation/stack";
 
import ClinicBookingScreen from "../screens/Appointment/ClinicBookingScreen";
import BookingScreen from "../screens/Appointment/BookingScreen";
import AppointmentScreen from "../screens/Appointment/AppointmentScreen";

const BookingStack = createStackNavigator();

export default function BookingStackNavigator(){
    return(
        
        <BookingStack.Navigator screenOptions={{ headerShown:false }}>
            <BookingStack.Screen name="AppointmentScreen" component={AppointmentScreen}/>
            <BookingStack.Screen name="BookingScreen" component={BookingScreen} />
            <BookingStack.Screen name="ClinicBooking" component={ClinicBookingScreen}/>
         
        </BookingStack.Navigator>
    )
}