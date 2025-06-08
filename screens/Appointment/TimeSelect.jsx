import { Text, View } from "react-native";
import ScrollableDatePicker from "../../components/ScrollableDatePicker";
import { useState } from "react";
import TimeSlotPicker from "../../components/TimeSlotPicker";
import ButtonWrapper from "./ButtonWrapper";
import CancelButton from "./CancelButton";
import NextPrevButtonWrapper from "./NextPrevButtonWrapper";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";

const TimeSelect = ({ theme, gStyles, onNext, handleCancel, prevStep }) => {

    const [selectedDate, setSelectedDate] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState([]);
    // Generate 30 days dynamically from today
    const generateDates = () => {
        return Array.from({ length: 15 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return {
                fullDate: date.toDateString(),
                day: date.toLocaleDateString("en-US", { weekday: "short" }), // "Mon", "Tue"
                dateNum: String(date.getDate()).padStart(2, '0'),

                // dateNum: date.getDate(), // 15, 16, 17...
            };
        });
    };

    const dates = generateDates();


    const handleNext = () => {
        if (selectedDate && selectedSlot) {
            onNext({ selectedDate, selectedSlot });
        } else {
            alert('Please select a nearby clinic.');
        }
    };1


    return (
        <>

            <View style={{ flex: 1, marginTop: 16 }} >
                <Text style={gStyles.stepFormScreenTitle}>Book Your Smile Time</Text>

                <ScrollableDatePicker dates={dates} selectedDate={selectedDate} handleSelect={(item) => setSelectedDate(item.fullDate)} />
                <TimeSlotPicker start="10:00" end="16:00" selectedTimeSlot={selectedSlot} handleSelect={(item) => setSelectedSlot(item)} />
            </View>

            <ButtonWrapper theme={theme} >
                <CancelButton theme={theme} handlePress={handleCancel} />


                <NextPrevButtonWrapper theme={theme}>
                    <PreviousButton theme={theme} handlePress={prevStep} />
                    {/* <PreviousButton theme={theme} handlePress={prevStep} /> */}
                    <NextButton theme={theme} handlePress={handleNext} />
                </NextPrevButtonWrapper>





            </ButtonWrapper >
        </>

    )
}

export default TimeSelect;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  