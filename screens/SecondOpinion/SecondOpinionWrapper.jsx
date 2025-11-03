import { Text, View } from "react-native";
import SafeAreaContainerStepForm from "../../components/SafeAreaContainerStepForm";
import { useTheme } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import { useSecondOpinion } from "../../context/SecondOpinionContext";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";
import ButtonWrapper from "../Appointment/ButtonWrapper";
import CancelButton from "../Appointment/CancelButton";
import NextPrevButtonWrapper from "../Appointment/NextPrevButtonWrapper";
import PreviousButton from "../Appointment/PreviousButton";
import NextButton from "../Appointment/NextButton";
import { useCallback, useState } from "react";
import { CommonActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";


export default function SecondOpinionWrapper({ children, screenTitle, heading, loading }) {
    const { theme } = useTheme();
    const gStyles = getGlobalStyles(theme);
    const route = useRoute();
    const navigation = useNavigation();
    const { currentStepIndex, countableSteps, setCurrentStepIndex, steps, goToNextStep, goToPrevStep, resetSecondOpinion, confirmSecondOpinion } = useSecondOpinion();

    const hideControls = route.name === "Confirmation";
    const isSummary = route.name === "Summary";
    const [wrapperLoading, setWrapperLoading] = useState(false);

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


    return (
        <SafeAreaContainerStepForm screenTitle={screenTitle}
            allowedBack={true}

            step={(currentStepIndex + 1 <= countableSteps?.length) ? (currentStepIndex + 1) : false}
            stepCount={countableSteps?.length}


        >

            <View style={{ flex: 1 }}>
                {heading && <Text style={gStyles.stepFormScreenTitle}>{heading}  </Text>}
                {children}
            </View>

            {!hideControls && (
                <View>
                    <ButtonWrapper theme={theme}>
                        {/* Cancel */}
                        <CancelButton
                            theme={theme}
                            handlePress={() => {
                                resetSecondOpinion();
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
                                        setWrapperLoading(true);
                                        try {

                                            const secondOpinionRequest = await confirmSecondOpinion();
                                            // 
                                            navigation.replace("Confirmation", { soRequest: secondOpinionRequest });

                                        } catch (err) {
                                            console.log("Confirm error:", err);
                                        }
                                        finally {
                                            setWrapperLoading(false);
                                        }
                                    }}
                                />


                            ) : (
                                currentStepIndex + 1 < steps.length && (
                                    <NextButton
                                        label="Next"
                                        theme={theme}
                                        handlePress={() => goToNextStep(navigation)}
                                    />
                                )
                            )}
                        </NextPrevButtonWrapper>
                    </ButtonWrapper>
                </View>
            )}

            {(loading || wrapperLoading) && <LoadingDotsWithOverlay />}
        </SafeAreaContainerStepForm>
    )
}