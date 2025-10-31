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
import Terms from "../screens/Terms";

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigator() {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
            <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
            <ProfileStack.Screen name="Terms" component={Terms} />

            <ProfileStack.Screen name="HelpSupport" component={HelpSupport} />
            <ProfileStack.Screen name="Settings" component={SettingsScreen} />
        </ProfileStack.Navigator>
    )
}