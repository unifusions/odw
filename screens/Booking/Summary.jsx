import { StyleSheet, Text, View } from "react-native";
import SafeAreaContainerStepForm from "../../components/SafeAreaContainerStepForm";
import { useBooking } from "../../context/BookingContext";
import BookingWrapper from "./BookingWrapper";
import Card from "../../components/Card";
import getGlobalStyles from "../../theme/globalStyles";
import { useContext } from "react";
import { ThemeContext, useTheme } from "../../theme/ThemeProvider";
import { CalendarIcon, ClockIcon, ListBulletIcon, MapPinIcon, UserIcon } from "react-native-heroicons/outline";
import { practiseYearCalculator } from "../../helpers/practiseyears";
import RowItem from "../../components/RowItem";

export default function Summary() {
    const { booking } = useBooking();
    const { theme } = useTheme();

   
    

    return (

        <BookingWrapper screenTitle="Booking Summary" heading="Review Appointment">
            {/* <Text>{JSON.stringify(booking?.category)}</Text> */}
            <Card>
                <RowItem
                    icon={<ListBulletIcon color={theme.blue} />}
                    title={booking?.category?.name ?? 'Not sure / its complex'}
                // subTitle={`STARTS FROM $ ${booking.selectedItems.cost ?? ''}`}
                />

                <RowItem
                    icon={<MapPinIcon color={theme.blue} />}
                    title={booking?.clinic?.name}
                // subTitle={booking.selectedClinic.address_line_1 + ', ' + booking.selectedClinic.address_line_2}
                />
 
                <RowItem
                    icon={<UserIcon color={theme.blue} />}
                    title={booking?.dentist ?booking?.dentist?.name : 'First Available'}
                    subTitle={booking?.dentist ? `${practiseYearCalculator(booking?.dentist?.practise_from)} years of practise` : ''}
                />

                <RowItem
                    icon={<CalendarIcon color={theme.blue} />}
                    title={booking?.time?.selectedDate?.fullDate}

                />

                <RowItem
                    icon={<ClockIcon color={theme.blue} />}
                    title={booking?.time?.selectedSlot}
                // subTitle={booking?.selectedDate}booking?.time?.selectedSlot +
                />
            </Card>

        </BookingWrapper>

    )
}