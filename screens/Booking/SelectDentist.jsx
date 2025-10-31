import { FlatList, Text } from "react-native";
import BookingWrapper from "./BookingWrapper";
import { useBooking } from "../../context/BookingContext";
import { useEffect, useState } from "react";
import DentistItem from "../Appointment/DentistItem";

export default function SelectDentist() {

    const { booking, updateBooking } = useBooking();
    const [loading, setLoading] = useState(false);

    return (

        <BookingWrapper screenTitle="Select Dentist" heading="Meet Your Tooth Hero">

            {booking?.clinic?.dentists?.length > 0 && booking?.clinic?.dentists?.map(
                (item) => <DentistItem key={item.id} dentist={item} handleSelect={() => {
                    updateBooking({ provider_type: "Dentist" })
                    updateBooking({ dentist: item })
                }} isSelected={booking?.dentist ? (booking?.dentist?.id === item.id) : false} />
            )}


        </BookingWrapper>
        // <Text>
        // {JSON.stringify(item.name)}
        // </Text>
    )
}