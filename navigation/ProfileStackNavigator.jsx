import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/Profile/SettingsScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigator(){
    return(
        <ProfileStack.Navigator screenOptions={{ headerShown:false }}>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen}/>
            <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />

            <ProfileStack.Screen name="Settings" component={SettingsScreen}/>
        </ProfileStack.Navigator>
    )
}