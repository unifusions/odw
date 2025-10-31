// import React, { useEffect } from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { useBooking } from "../context/BookingContext";

// // screens
// import SelectTime from "../screens/Booking/SelectTime";
// import SelectCategory from "../screens/Booking/SelectCategory";
// import SelectServices from "../screens/Booking/SelectServices";
// import SelectClinic from "../screens/Booking/SelectClinic";
// import SelectDentist from "../screens/Booking/SelectDentist";
// import Summary from "../screens/Booking/Summary";
// import Confirmation from "../screens/Booking/Confirmation";

// const Stack = createStackNavigator();

// const masterFlow = [
//   "SelectTime",
//   "SelectCategory",
//   "SelectServices",
//   "SelectClinic",
//   "SelectDentist",
//   "Summary",
//   "Confirmation",
// ];

// const screens = {
//   SelectTime,
//   SelectCategory,
//   SelectServices,
//   SelectClinic,
//   SelectDentist,
//   Summary,
//   Confirmation,
// };

// export default function BookingNavigator({ route }) {
//   const { preselected = {}, startAt  } = route.params || {};
//   const { updateBooking, booking, setInitialStep, initialStep  } = useBooking();

//   useEffect(() => {
//     if (preselected && Object.keys(preselected).length > 0) {
//       updateBooking(preselected);

//       // decide starting step
//       if (preselected.clinic) {
//         setInitialStep("clinic");
//       } else if (preselected.category) {
//         setInitialStep("SelectCategory");
//       } else if (preselected.dentist) {
//         setInitialStep("SelectDentist");
//       } else {
//         setInitialStep("SelectTime");
//       }
//     }
//   }, [preselected]);

//   // filter flow based on preselected
//   const filteredFlow = masterFlow.filter((step) => {
//     if (step === "SelectCategory" && booking.category) return false;
//     if (step === "SelectClinic" && booking.clinic) return false;
//     if (step === "SelectDentist" && booking.dentist) return false;
//     return true;
//   });

//   return (
//     <Stack.Navigator
//       screenOptions={{ headerShown: false }}
//       initialRouteName={filteredFlow[0]}
//     >
//       {masterFlow.map((screen) => (
//         <Stack.Screen key={screen} name={screen} component={screens[screen]} />
//       ))}
 
//     </Stack.Navigator>
//   );
// }


import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useBooking } from "../context/BookingContext";

// screens
import SelectTime from "../screens/Booking/SelectTime";
import SelectCategory from "../screens/Booking/SelectCategory";
import SelectServices from "../screens/Booking/SelectServices";
import SelectClinic from "../screens/Booking/SelectClinic";
import SelectDentist from "../screens/Booking/SelectDentist";
import Summary from "../screens/Booking/Summary";
import Confirmation from "../screens/Booking/Confirmation";
import { useRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

const flowSteps = ["SelectTime", "SelectCategory",   "SelectDentist", "Summary", "Confirmation"];


const screens = {
  SelectTime,
  SelectCategory,
  SelectServices,

  SelectDentist,
  Summary,
  Confirmation,
};

export default function ClinicBookingNavigator() {
  
  const { setSteps, updateBooking } = useBooking();
const route = useRoute();
const {clinic, preselected} = route.params;
  useEffect(() => {
    setSteps(flowSteps);
    
    if (route?.params?.clinic) {
        updateBooking({ clinic: clinic });
        
      }
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={flowSteps[0]}
    >
      {flowSteps.map((screen) => (
        <Stack.Screen key={screen} name={screen} component={screens[screen]} />
      ))}
 
    </Stack.Navigator>
  );
}


 
