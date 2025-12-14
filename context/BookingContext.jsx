// // src/context/BookingContext.js
// import { format, parse } from "date-fns";
// import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
// import { AuthContext } from "./AuthContext";
// import { bookAppointment } from "../services/appointmentservices";

// const BookingContext = createContext();

// export const BookingProvider = ({ children }) => {

//     const { user } = useContext(AuthContext);
//     const [booking, setBooking] = useState({
//         time: null,
//         category: null,
//         services: [],
//         clinic: null,
//         dentist: null,
//     });

//     // Default starting step
//     const [initialStep, setInitialStep] = useState("time"); // "time", "category", "clinic", "dentist"

//     const steps = useMemo(() => {
//         switch (initialStep) {
//             case "time":
//                 return ["time", "category", "clinic", "dentist", "summary", "confirmation"];
//             case "category":
//                 return ["category", "time", "clinic", "dentist", "summary", "confirmation"];
//             case "clinic":
//                 return ["clinic", "time", "category", "dentist", "summary", "confirmation"];
//             case "dentist":
//                 return ["dentist", "time", "category", "clinic", "summary", "confirmation"];
//             default:
//                 return ["time", "category", "clinic", "dentist", "summary", "confirmation"];
//         }
//     }, [initialStep]);

//     // Always reset to first step when initialStep changes
//     const [currentStepIndex, setCurrentStepIndex] = useState(0);
//     useEffect(() => {

//         if (currentStepIndex !== 0) {

//             setCurrentStepIndex(0);
//         }
//     }, [initialStep]);

//     const cancelBooking = () => {

//         setBooking({
//             time: null,
//             category: null,
//             services: [],
//             clinic: null,
//             dentist: null,
//         });
//         setInitialStep("time");
//         setCurrentStepIndex(0);

//     };

//     const goToNextStep = (navigation) => {

//         const nextIndex = currentStepIndex + 1;
//         if (nextIndex < steps.length) {
//             setCurrentStepIndex(nextIndex);
//             navigation.navigate(getScreenName(steps[nextIndex]));
//         }


//     };

//     const goToPrevStep = (navigation) => {
//         const prevIndex = currentStepIndex - 1;
//         if (prevIndex >= 0) {
//             setCurrentStepIndex(prevIndex);
//             navigation.navigate(getScreenName(steps[prevIndex]));
//         }
//     };

//     const countableSteps = useMemo(() => {
//         return steps.filter((s) => !["summary", "confirmation"].includes(s));
//     }, [steps]);


//     const getScreenName = (step) => {
//         switch (step) {
//             case "time": return "SelectTime";
//             case "category": return "SelectCategory";
//             // case "services": return "SelectServices";
//             case "clinic": return "SelectClinic";
//             case "dentist": return "SelectDentist";
//             case "summary": return "Summary";
//             case "confirmation": return "Confirmation";
//             default: return "time";
//         }
//     };

//     const updateBooking = (data) => {
//         setBooking((prev) => {
//             const mergeDeep = (target, source) => {
//                 for (const key in source) {
//                     if (
//                         source[key] &&
//                         typeof source[key] === "object" &&
//                         !Array.isArray(source[key])
//                     ) {
//                         target[key] = mergeDeep(target[key] || {}, source[key]);
//                     } else {
//                         target[key] = source[key];
//                     }
//                 }
//                 return { ...target };
//             };

//             return mergeDeep({ ...prev }, data);
//         });
//     };

//     const resetBooking = () => {
//         setBooking({
//             time: null,
//             category: null,
//             services: [],
//             clinic: null,
//             dentist: null,
//         });
//         setInitialStep("time");
//         setCurrentStepIndex(0);
//     }
//     const confirmBooking = async () => {

//         console.log("Booking started");

//         let patient_id = user.patient.id;

//         let clinic_id = booking?.clinic.id;


//         let clinic_dentist_id = booking?.dentist.pivot.id;
//         let time_slot = booking?.time?.selectedSlot.split(' ')[0];
//         // let appointment_date = formData.selectedDate;


//         let dental_service_id = booking?.category?.id;

//         const inputFormat = "E MMM dd yyyy";

//         const parsedDate = parse(booking?.time?.selectedDate.fullDate, inputFormat, new Date());
//         const outputFormat = "yyyy-MM-dd";
//         const appointment_date = format(parsedDate, outputFormat);



//         try {
//             console.log("Booking trying");
//             const response = await bookAppointment(
//                 patient_id, clinic_id, appointment_date, time_slot,
//                 clinic_dentist_id, dental_service_id)

//             if (response.status === 200) {


//                 return response.data
//             }
//         }
//         catch (error) {
//             return error
//         }
//         console.log("Booking success");
//     }

//     return (

//         <BookingContext.Provider
//             value={{
//                 booking,
//                 updateBooking,
//                 initialStep,
//                 setInitialStep, // ⚠️ Only set once when starting booking
//                 steps,
//                 currentStepIndex,
//                 goToNextStep,
//                 goToPrevStep,
//                 cancelBooking,
//                 countableSteps,
//                 setCurrentStepIndex,
//                 confirmBooking,
//                 resetBooking
//             }}
//         >
//             {children}
//         </BookingContext.Provider>
//     );
// };

// export const useBooking = () => useContext(BookingContext);


// src/context/BookingContext.js
// src/context/BookingContext.js
import React, { createContext, useContext, useState } from "react";
import { bookAppointment } from "../services/appointmentservices";
import { format, parse } from "date-fns";
import { AuthContext } from "./AuthContext";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    time: null,
    category: null,
    services: [],
    clinic: null,
    dentist: null,
    specialist: null,
    provider_type: null,
  });

  const [error, setError] = useState({});

  const [steps, setSteps] = useState([]); // Each navigator will set this
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Navigate to next step
  const goToNextStep = (navigation) => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStepIndex(nextIndex);
      // navigation.navigate(steps[nextIndex]);
      navigation.replace(steps[nextIndex]);
    }
  };

  // Navigate to previous step
  const goToPrevStep = (navigation) => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStepIndex(prevIndex);
      // navigation.navigate(steps[prevIndex]);
      navigation.replace(steps[prevIndex]);
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

  const convertTo24Hour = (time12h) => {

    const clean = time12h.replace(/\s+/g, ' ').replace(/\u202F/g, ' ');
    const [time, modifier] = clean.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  const confirmBooking = async () => {

    const patient_id = user.patient.id;
    const clinic_id = booking?.clinic?.id;

    const appointable_id = booking?.dentist?.id || booking?.specialist?.id;
    const appointable_type = booking?.provider_type;
    const dental_service_id = booking?.category?.id;
    // const time_slot = booking?.time?.selectedSlot?.split(' ')[0];

    const time_slot = convertTo24Hour(booking?.time?.selectedSlot);
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

        return response.data;
      }
    } catch (error) {
      console.log("catch error");
      console.log(error)
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

export const useBooking = () => useContext(BookingContext);
