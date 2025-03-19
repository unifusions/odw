import { useContext, useState } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import ScreenHeader from "../../components/ScreenHeader";
import { useNavigation } from "@react-navigation/native";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import ScrollableDatePicker from "../../components/ScrollableDatePicker";
import TimeSlotPicker from "../../components/TimeSlotPicker";
import ModalDialog from "../../components/ModalDialog";
import ServiceDropdown from "../../components/ServiceDropdown";

export default function BookingScreen() {
  const { theme } = useContext(ThemeContext);
  const gStyles = getGlobalStyles(theme);
  const navigation = useNavigation();

  const [isConfirmVisible, setConfirmVisible] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[gStyles.safeAreaContainer, { flex: 1 }]}>
        <ScreenHeader
          title="New Appointment"
          onBackPress={() => navigation.goBack()}
          RightIcon={CalendarDaysIcon}
        />

        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          <View style={gStyles.container}>
            <Image source={{ uri: "https://placehold.co/100x100.png" }} style={gStyles.bookingAvatar} />
            <Text style={[gStyles.dentistName]}>Dr. Satya Joshi</Text>
            <Text style={[gStyles.textCenter, gStyles.textGrey, gStyles.textFont]}>Clinic Name</Text>
            <ScrollableDatePicker />
            <TimeSlotPicker />
            <ServiceDropdown />
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={[gStyles.fixedBottomContainer]}>
          <TouchableOpacity style={gStyles.cta} onPress={() => setConfirmVisible(true)}>
            <Text style={gStyles.buttonText}>Confirm Appointment</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modal Dialog */}
      <ModalDialog
        visible={isConfirmVisible}
        title="Congratulations"
        message="Your appointment with Dr. Satya Joshi on Jan 17 at 9:00 AM will be confirmed shortly"
        onConfirm={() => setConfirmVisible(false)}
      />
    </SafeAreaProvider>
  );
}
