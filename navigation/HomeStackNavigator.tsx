import { createStackNavigator } from "@react-navigation/stack";
import ServicesIndexScreen from "../screens/Services/ServicesIndexScreen";
import HomeScreen from "../screens/HomeScreen";
const HomeStack = createStackNavigator();


export default function HomeStackNavigator() {
    
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen name="AllServices" component={ServicesIndexScreen} />



        </HomeStack.Navigator>
    )
}