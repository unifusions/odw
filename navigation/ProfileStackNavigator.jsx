import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/Profile/SettingsScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigator(){
    return(
        <ProfileStack.Navigator screenOptions={{ headerShown:false }}>
            <ProfileStack.Screen name="Profile" component={ProfileScreen}/>

            <ProfileStack.Screen name="Settings" component={SettingsScreen}/>
        </ProfileStack.Navigator>
    )
}