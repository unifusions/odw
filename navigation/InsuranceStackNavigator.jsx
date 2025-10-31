import { createStackNavigator } from "@react-navigation/stack";
import MyInsurance from "../screens/Profile/MyInsurance";
import AddInsurance from "../screens/Profile/AddInsurance";
import InsuranceDetail from "../screens/Profile/Insurance/InsuranceDetail";


const InsuranceStack = createStackNavigator();

export default function InsuranceStackNavigator() {
    return (
        <InsuranceStack.Navigator screenOptions={{ headerShown: false }}>
            
            <InsuranceStack.Screen name="MyInsurance" component={MyInsurance} />
            <InsuranceStack.Screen name="AddInsurance" component={AddInsurance} />
            <InsuranceStack.Screen name="InsuranceDetail" component={InsuranceDetail} />
        </InsuranceStack.Navigator>
    )
}