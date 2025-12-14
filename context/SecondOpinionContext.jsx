import React, { createContext, useContext, useState } from "react";
import { bookAppointment } from "../services/appointmentservices";
import { format, parse } from "date-fns";
import { AuthContext } from "./AuthContext";
import { Platform } from "react-native";
import api from "../services/api";

const SecondOpinionContext = createContext();

export const SecondOpinionProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    const [secondOpinion, setSecondOpinion] = useState({
        category: null,
        services: [],
        description: '',
        last_visit: null,
        is_quick: false,
        documents: [],
        insurance: null,

    });

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

    const updateSecondOpinion = (data) => {
        setSecondOpinion((prev) => {
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

    const resetSecondOpinion = () => {
        setSecondOpinion({
            category: null,
            services: [],
            description: '',
            last_visit: null,
            is_quick: false,
            documents: [],
            insurance: null
        });
        setCurrentStepIndex(0);
    };

    const confirmSecondOpinion = async () => {



        let finalFormData = new FormData();


        finalFormData.append('patient_id', user.patient.id);
        finalFormData.append('description', secondOpinion?.description);
        finalFormData.append('last_visit', secondOpinion?.last_visit?.name);
        secondOpinion?.services?.forEach((item, i) => {
            finalFormData.append('dental_cares[]', item.id)
        })
        finalFormData.append('is_quick', secondOpinion.is_quick);

        secondOpinion?.documents.forEach((doc, i) => {
            const file = doc.uri ? doc : doc.assets?.[0];

            const newImageUri =
                Platform.OS === "ios"
                    ? file.uri.replace("file://", "")
                    : file.uri;


            finalFormData.append('attachments[]', {
                uri: newImageUri,
                type: file.mimeType || 'application/octet-stream',
                name: file.name || `file_${i}`,
            });

        })

        let headers = { 'Content-Type': 'multipart/form-data' };
        try {
            const response = await api.post('/second-opinions/store', finalFormData, { headers })
            if (response.status == 200) {
                
                return response.data;
            }

        }
        catch (error) {
            console.log("Upload Error", error.response);
        }
        
    };

    const countableSteps = steps.filter((s) => !["Summary", "Confirmation"].includes(s));

    return (
        <SecondOpinionContext.Provider
            value={{
                secondOpinion,
                updateSecondOpinion,
                steps,
                setSteps,
                currentStepIndex,
                setCurrentStepIndex,
                goToNextStep,
                goToPrevStep,
                countableSteps,
                resetSecondOpinion,
                confirmSecondOpinion,
            }}
        >
            {children}
        </SecondOpinionContext.Provider>
    );
};

export const useSecondOpinion = () => useContext(SecondOpinionContext);
