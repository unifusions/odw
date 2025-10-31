import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/Profile/SettingsScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import MySecondOpinions from "../screens/Profile/MySecondOpinions";
import MyEstimates from "../screens/Profile/MyEstimates";
import MyAppointments from "../screens/Profile/MyAppointments";
import HelpSupport from "../screens/Profile/HelpSupport";
import MyInsurance from "../screens/Profile/MyInsurance";
import InsuranceStackNavigator from "./InsuranceStackNavigator";
import InboxScreen from "../screens/Inbox/InboxScreen";
import AppointmentScreen from "../screens/Profile/AppointmentScreen";
import ShowSo from "../screens/Profile/ShowSo";
import ShowEstimate from "../screens/Profile/ShowEstimate";
import ShowSoReply from "../screens/Profile/ShowSoReply";
import ShowSoReplyPdf from "../screens/Profile/ShowSoReplyPdf";

const InboxStack = createStackNavigator();

export default function InboxStackNavigator() {
    return (
        <InboxStack.Navigator screenOptions={{ headerShown: false }}>
            <InboxStack.Screen name="MyInbox" component={InboxScreen} />
            <InboxStack.Screen name="MyAppointments" component={MyAppointments} />
            <InboxStack.Screen name="Appointment" component={AppointmentScreen} />
            <InboxStack.Screen name="MyEstimates" component={MyEstimates} />
            <InboxStack.Screen name="MyInsurance" component={InsuranceStackNavigator} />
            <InboxStack.Screen name="MySecondOpinions" component={MySecondOpinions} />
            <InboxStack.Screen name="ShowSo" component={ShowSo} />
            <InboxStack.Screen name="ShowSoReply" component={ShowSoReply} />
            <InboxStack.Screen name="ShowSoReplyPdf" component={ShowSoReplyPdf} />
            <InboxStack.Screen name="ShowEstimate" component={ShowEstimate} />



        </InboxStack.Navigator>
    )
}