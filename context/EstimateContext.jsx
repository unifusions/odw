
import React, { createContext, useContext, useState } from "react";
import { bookAppointment } from "../services/appointmentservices";
import { format, parse } from "date-fns";
import { AuthContext } from "./AuthContext";

const EstimateContext = createContext();

export const EstimateProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    const [estimate, setEstimate] = useState({

        category: null,
        services: [],
        concern: null,
        insurance: [],
        is_quick: false
    });

    const [error, setError] = useState({});

    const [steps, setSteps] = useState([]); // Each navigator will set this
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // Navigate to next step
    const goToNextStep = (navigation) => {
        const nextIndex = currentStepIndex + 1;
        if (nextIndex < steps.length) {
            setCurrentStepIndex(nextIndex);
            navigation.navigate(steps[nextIndex]);
        }
    };

    // Navigate to previous step
    const goToPrevStep = (navigation) => {
        const prevIndex = currentStepIndex - 1;
        if (prevIndex >= 0) {
            setCurrentStepIndex(prevIndex);
            navigation.navigate(steps[prevIndex]);
        }
    };

    const updateBooking = (data) => {
        setBooking((prev) => {
            const mergeDeep = (target, source) => {
                for (const key in source) {
                    if (
                        source[key] &&
                        typeof source[key] === "object" &&
                        !Array.isArray(source[key])
                    ) {
                        target[key] = mergeDeep(target[key] || {}, source[key]);
                    } else {
                        target[key] = source[key];
                    }
                }
                return { ...target };
            };
            return mergeDeep({ ...prev }, data);
        });
    };

    const resetBooking = () => {
        setBooking({
            time: null,
            category: null,
            services: [],
            clinic: null,
            dentist: null,
        });
        setCurrentStepIndex(0);
    };

    const confirmBooking = async () => {

        const patient_id = user.patient.id;
        const clinic_id = booking?.clinic?.id;

        const appointable_id = booking?.dentist?.id || booking?.specialist?.id;
        const appointable_type = booking?.provider_type;
        const dental_service_id = booking?.category?.id;
        const time_slot = booking?.time?.selectedSlot?.split(' ')[0];

        const inputFormat = "E MMM dd yyyy";
        const parsedDate = parse(booking?.time?.selectedDate.fullDate, inputFormat, new Date());
        const appointment_date = format(parsedDate, "yyyy-MM-dd");


        try {
            const response = await bookAppointment(
                patient_id,
                clinic_id,
                appointment_date,
                time_slot,
                dental_service_id,
                appointable_id,
                appointable_type
            );

            if (response.status === 200) {

                return response.data; // bookingRequest to pass to Confirmation
            }
        } catch (error) {
            // console.log(error.data)
            setError(error)

        }
    };

    const countableSteps = steps.filter((s) => !["Summary", "Confirmation"].includes(s));

    return (
        <BookingContext.Provider
            value={{
                booking,
                updateBooking,
                steps,
                setSteps,
                currentStepIndex,
                setCurrentStepIndex,
                goToNextStep,
                goToPrevStep,
                countableSteps,
                resetBooking,
                confirmBooking,
                error
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useEstimate = () => useContext(BookingContext);
