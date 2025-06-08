import { createStackNavigator } from "@react-navigation/stack";
import ServicesIndexScreen from "../screens/Services/ServicesIndexScreen";
import HomeScreen from "../screens/HomeScreen";
import ServiceItemScreen from "../screens/Services/ServiceItemScreen";
import SecondOpinion from "../screens/SecondOpinion/SecondOpinion";
import Estimate from "../screens/Estimate/Estimate";
const HomeStack = createStackNavigator();


export default function HomeStackNavigator() {

    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen name="AllServices" component={ServicesIndexScreen} />

            <HomeStack.Screen name="ServiceItem" component={ServiceItemScreen} />

            {/* SECOND OPINION */}

            <HomeStack.Screen name="SecondOpinion" component={SecondOpinion} />

            {/* ESITMATE */}
            <HomeStack.Screen name="Estimate" component={Estimate} />
        </HomeStack.Navigator>
    )
}