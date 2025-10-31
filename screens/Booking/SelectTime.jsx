 
 
import { useBooking } from "../../context/BookingContext";
 
import ScrollableDatePicker from "../../components/ScrollableDatePicker";
import TimeSlotPicker from "../../components/TimeSlotPicker";
 
import BookingWrapper from "./BookingWrapper";
import generateDates from "../../helpers/generateDates";


export default function SelectTime() {
    const { booking, updateBooking, steps, currentStepIndex, goToNextStep, goToPrevStep, cancelBooking } = useBooking();
     
    
    
    
    const dates = generateDates();

    return (
        <BookingWrapper screenTitle="Select Date & Time" heading="Book Your Smile Time">

            <ScrollableDatePicker dates={dates} selectedDate={booking?.time?.selectedDate?.fullDate} handleSelect={(item) =>
                updateBooking({ time: { selectedDate: item } })
            } />
            <TimeSlotPicker start="08:00" end="20:00" 
            disabled={booking?.time?.selectedDate ?false : true}
            selectedTimeSlot={booking?.time?.selectedSlot} handleSelect={(item) => updateBooking({ time: { selectedSlot: item } })} />

        </BookingWrapper>
    )
}