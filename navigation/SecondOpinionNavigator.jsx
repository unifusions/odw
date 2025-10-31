
import { useSecondOpinion } from "../context/SecondOpinionContext";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SelectCategory from "../screens/SecondOpinion/SelectCategory";
import Summary from "../screens/SecondOpinion/Summary";
import SelectServices from "../screens/SecondOpinion/SelectServices";
import AddMoreInfo from "../screens/SecondOpinion/AddMoreInfo";
import Confirmation from "../screens/SecondOpinion/Confirmation";

const flowSteps = [
    "SelectCategory",
    "SelectServices",
    "AddMoreInfo",
    // "SelectInsurance",
    "Summary",

    "Confirmation"
];


const screens = {

    SelectCategory,
    SelectServices,
    AddMoreInfo,
    // SelectInsurance,
    Summary,
    Confirmation,
};

const Stack = createStackNavigator();

export default function SecondOpinionNavigator() {
    const { setSteps } = useSecondOpinion();

    useEffect(() => {
        setSteps(flowSteps);

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