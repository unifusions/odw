import { createStackNavigator } from "@react-navigation/stack";
import MyInsurance from "../screens/Profile/MyInsurance";
import AddInsurance from "../screens/Profile/AddInsurance";


const InsuranceStack = createStackNavigator();

export default function InsuranceStackNavigator() {
    return (
        <InsuranceStack.Navigator screenOptions={{ headerShown: false }}>
            
            <InsuranceStack.Screen name="Insurance" component={MyInsurance} />
            <InsuranceStack.Screen name="AddInsurance" component={AddInsurance} />
        </InsuranceStack.Navigator>
    )
}