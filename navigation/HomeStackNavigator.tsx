import { createStackNavigator } from "@react-navigation/stack";
import ServicesIndexScreen from "../screens/Services/ServicesIndexScreen";
import HomeScreen from "../screens/HomeScreen";
import ServiceItemScreen from "../screens/Services/ServiceItemScreen";
import SecondOpinion from "../screens/SecondOpinion/SecondOpinion";
import Estimate from "../screens/Estimate/Estimate";
import AppointmentScreen from "../screens/Appointment/AppointmentScreen";
import BookingStackNavigator from "./BookingStackNavigator";
import ClinicBookingScreen from "../screens/Appointment/ClinicBookingScreen";
import BookEmergency from "../screens/Emergency/BookEmergency";
import GuidedEstimate from "../screens/Estimate/GuidedEstimate";
import QuickEstimate from "../screens/Estimate/QuickEstimate";
import QuickOpinion from "../screens/SecondOpinion/QuickOpinion";
import GuidedOpinion from "../screens/SecondOpinion/GuidedOpinion";
import ShowClinic from "../screens/Clinic/ShowClinic";
import ClinicAppointment from "../screens/Clinic/ClinicAppointment";
import CompareScreen from "../screens/CompareScreen";
import SelectInsurance from "../screens/Estimate/SelectInsurance";
import ClinicBookingNavigator from "./ClinicBookingNavigator";
import CategoryBookingNavigator from "./CategoryBookingNavigator";
import { SecondOpinionProvider } from "../context/SecondOpinionContext";
import SecondOpinionNavigator from "./SecondOpinionNavigator";
import Specialist from "../screens/Specialist/Specialist";
import ShowDentist from "../screens/Dentist/ShowDentist";
import DentistBookingNavigator from "./DentistBookingNavigator";
import ShowSpecialist from "../screens/Specialist/ShowSpecialist";
import BookSpecialist from "../screens/Specialist/BookSpecialist";



export default function HomeStackNavigator() {
    const HomeStack = createStackNavigator();

    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen name="AllServices" component={ServicesIndexScreen} />

            <HomeStack.Screen name="ServiceItem" component={ServiceItemScreen} />
            <HomeStack.Screen name="Compare" component={CompareScreen} />

            {/* SECOND OPINION */}

            <HomeStack.Screen name="SecondOpinion" component={SecondOpinion} />

            <HomeStack.Screen name="QuickOpinion" component={QuickOpinion} />
            {/* <HomeStack.Screen name="GuidedOpinion" component={GuidedOpinion} /> */}
            <HomeStack.Screen name="SecondOpinionC" >
                {() => (<SecondOpinionProvider>
                    <SecondOpinionNavigator />
                </SecondOpinionProvider>)}
            </HomeStack.Screen>

            {/* ESITMATE */}
            <HomeStack.Screen name="Estimate" component={Estimate} />
            <HomeStack.Screen name="GuidedEstimate" component={GuidedEstimate} />
            <HomeStack.Screen name="QuickEstimate" component={QuickEstimate} />

            <HomeStack.Screen name="ClinicBooking" component={ClinicBookingNavigator} />
            <HomeStack.Screen name="CategoryBooking" component={CategoryBookingNavigator} />
            <HomeStack.Screen name="DentistBooking" component={DentistBookingNavigator} />

            <HomeStack.Screen name="EstimateInsurance" component={SelectInsurance} />

            {/* CLINICS */}

            <HomeStack.Screen name="ShowClinic" component={ShowClinic} />
            <HomeStack.Screen name="ClinicAppointment" component={ClinicAppointment} />

            {/* EMERGENCY */}
            <HomeStack.Screen name="Emergency" component={BookEmergency} />

            {/* SPECIALISTS */}

            <HomeStack.Screen name="Specialist" component={Specialist} />
            
            <HomeStack.Screen name="ShowDentist" component={ShowDentist} />
            <HomeStack.Screen name="ShowSpecialist" component={ShowSpecialist} />
            <HomeStack.Screen name="BookSpecialist" component={BookSpecialist} />

        </HomeStack.Navigator>
    )
}