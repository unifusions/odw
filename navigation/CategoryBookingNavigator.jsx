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

const flowSteps = ["SelectTime",  "SelectClinic", "SelectDentist", "Summary", "Confirmation"];


const screens = {
  SelectTime,
  SelectServices,
  SelectClinic,
  SelectDentist,
  Summary,
  Confirmation,
};

export default function CategoryBookingNavigator() {
  
  const { setSteps, updateBooking } = useBooking();
const route = useRoute();

  const {category} = route.params;

  useEffect(() => {
    setSteps(flowSteps);
    console.log(category)
    if (category) {
        updateBooking({ category: category });
        
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


 
