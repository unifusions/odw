import { Alert, Text, View } from "react-native";

import SafeAreaContainerStepForm from "../../components/SafeAreaContainerStepForm";
import { useBooking } from "../../context/BookingContext";
import ButtonWrapper from "../Appointment/ButtonWrapper";
import CancelButton from "../Appointment/CancelButton";
import NextPrevButtonWrapper from "../Appointment/NextPrevButtonWrapper";
import NextButton from "../Appointment/NextButton";
import { useCallback, useContext, useState } from "react";
import { ThemeContext, useTheme } from "../../theme/ThemeProvider";
import { useFocusEffect, useNavigation, CommonActions, useRoute } from "@react-navigation/native";
import PreviousButton from "../Appointment/PreviousButton";
import getGlobalStyles from "../../theme/globalStyles";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";

export default function BookingWrapper({ children, screenTitle, heading }) {

    const { theme } = useTheme();

    // const navigation = useNavigation();
    const route = useRoute();
    const {
        steps,
        currentStepIndex,
        goToNextStep,
        goToPrevStep,
        booking,
        countableSteps,
        resetBooking,
        confirmBooking,
        setCurrentStepIndex,
    } = useBooking();

    const hideControls = route.name === "Confirmation";

    const isSummary = route.name === "Summary";
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = navigation.addListener("beforeRemove", (e) => {
                if (e.data.action.type === "GO_BACK") {
                    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
                }
            });

            return unsubscribe;
        }, [navigation, setCurrentStepIndex])
    );

    // useEffect(()=> {
    //     console.log(bookingFlowSteps)
    // })
    const gStyles = getGlobalStyles(theme);

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);



    return (

        <SafeAreaContainerStepForm
            screenTitle={screenTitle}
            step={(currentStepIndex + 1 <= countableSteps?.length) ? (currentStepIndex + 1) : false}
            stepCount={countableSteps?.length}
            allowedBack={true}
        >
            <View style={{ flex: 1 }}>
                <Text style={gStyles.stepFormScreenTitle}>{heading}  </Text>
                {children}
            </View>

            {!hideControls && (
                <View>
                    <ButtonWrapper theme={theme}>
                        {/* Cancel */}
                        <CancelButton
                            theme={theme}
                            handlePress={() => {
                                resetBooking();
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [{ name: "Home" }],
                                    })
                                );
                            }}
                        />

                        <NextPrevButtonWrapper theme={theme}>
                            {/* Previous (not on first step) */}
                            {currentStepIndex >= 1 && (
                                <PreviousButton
                                    theme={theme}
                                    handlePress={() => goToPrevStep(navigation)}
                                />
                            )}

                            {/* Confirm instead of Next on Summary */}
                            {isSummary ? (
                                <NextButton
                                    theme={theme}
                                    label="Confirm"
                                    isConfirm={true}
                                    handlePress={async () => {
                                        setLoading(true);
                                        try {
                                            const bookingRequest = await confirmBooking();

                                            navigation.replace("Confirmation", { bookingRequest: bookingRequest });

                                        } catch (err) {
                                            Alert.alert("Booking error:", err);
                                        }
                                        finally {
                                            setLoading(false);
                                        }
                                    }}
                                />


                            ) : (
                                currentStepIndex + 1 < steps.length && (
                                    <NextButton
                                        label="Next"
                                        theme={theme}
                                        handlePress={() => goToNextStep(navigation)}
                                        isDisabled={booking.time ? ((booking.time?.selectedDate && booking.time?.selectedSlot) ? false : true) : true}
                                    />

                                )
                            )}
                        </NextPrevButtonWrapper>
                    </ButtonWrapper>
                </View>
            )}
            
            {loading && <LoadingDotsWithOverlay />}
        </SafeAreaContainerStepForm>
    )
}