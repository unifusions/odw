import { useContext, useState } from "react";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import getGlobalStyles from "../../theme/globalStyles";
import ScreenHeader from "../../components/ScreenHeader";
import { CalendarIcon, ChevronDownIcon, PencilIcon } from "react-native-heroicons/outline";
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function EditProfileScreen() {
    const { theme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    const navigation = useNavigation();
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());

    const [profile, setProfile] = useState({
        name: "",
        nickname: "",
        email: "",
        dob: "",
        gender: "",
        profileImage: "https://placehold.co/160x160",
    });

    const handleDateConfirm = (selectedDate) => {
        setDate(selectedDate);
        setProfile({ ...profile, dob: selectedDate.toISOString().split("T")[0] });
        setOpenDatePicker(false);
    };

    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={styles.safeAreaContainer}>

                    <ScreenHeader
                        title="Edit Profile"
                        onBackPress={() => navigation.goBack()}
                        RightIcon={CalendarIcon} // Optional Right Icon

                    />
                    <View style={styles.container}>
                        <View style={localStyles.imageContainer}>
                            <Image source={{ uri: profile.profileImage }} style={localStyles.profileImage} />
                            <TouchableOpacity style={localStyles.editButton}>
                                <PencilIcon size={18} color="white" />
                            </TouchableOpacity>
                        </View>
                        <TextInput style={localStyles.input} value={profile.name} onChangeText={(text) => setProfile({ ...profile, name: text })} placeholder="Full Name" />
                        <TextInput style={localStyles.input} value={profile.nickname} onChangeText={(text) => setProfile({ ...profile, nickname: text })} placeholder="Nickname" />
                        <TextInput style={localStyles.input} value={profile.email} onChangeText={(text) => setProfile({ ...profile, email: text })} placeholder="Email" keyboardType="email-address" />

                        {/* Date of Birth Field - Opens Date Picker */}
                        <TouchableOpacity style={localStyles.inputIconContainer} onPress={() => setOpenDatePicker(true)}>
                            <CalendarIcon size={18} color="#9E9E9E" />
                            <Text style={localStyles.dateText}>{profile.dob || "Date of Birth"}</Text>
                        </TouchableOpacity>
{/* 
                        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                            <Text>Select Date: {date.toDateString()}</Text>
                        </TouchableOpacity> */}

                        {/* <DatePicker
                            modal
                            open={openDatePicker}
                            date={date}
                            mode="date"
                            onConfirm={handleDateConfirm}
                            onCancel={() => setOpenDatePicker(false)}
                        /> */}

                        <DateTimePickerModal
                            isVisible={openDatePicker}
                            mode="date"
                            // display="calendar"
                            onConfirm={handleDateConfirm}
                            onCancel={() => setOpenDatePicker(false)}
                        />

                        {/* Gender Dropdown */}
                        <View style={localStyles.inputIconContainer}>
                            <TextInput style={localStyles.inputIcon} placeholder="Gender" />
                            <ChevronDownIcon size={18} color="#9E9E9E" />
                        </View>
                    </View>





                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}


const localStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
        flex: 1,
    },
    imageContainer: {
        position: "relative",
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#F1F1F1",
    },
    editButton: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: "#1E293B",
        padding: 6,
        borderRadius: 20,
    },
    input: {
        width: "100%",
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        marginBottom: 10,
        backgroundColor: "#F7F7F7",
    },
    inputIconContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        backgroundColor: "#F7F7F7",
        marginBottom: 10,
    },
    inputIcon: {
        flex: 1,
        marginLeft: 10,
    },
    dateText: {
        flex: 1,
        marginLeft: 10,
        color: "#9E9E9E",
    },
});