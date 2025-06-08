import { View, Text, Button, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import getGlobalStyles from "../../theme/globalStyles";
import { useContext, useState } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
import { ArrowRightOnRectangleIcon, BellIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, ChevronRightIcon, Cog6ToothIcon, CurrencyDollarIcon, HeartIcon, LifebuoyIcon, QuestionMarkCircleIcon, ShieldCheckIcon, UserIcon } from "react-native-heroicons/outline";
import BottomSheetDialog from "../../components/BottomSheetDialog";
import ScreenHeader from "../../components/ScreenHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";


export default function ProfileScreen() {

    const { theme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    const { user, logout } = useContext(AuthContext);
    const menuItems = [
        { id: "0", title: "Edit Profile", icon: UserIcon, onPress: () => navigation.navigate("EditProfile") },
        { id: "1", title: "My Appointments", icon: CalendarDaysIcon, onPress: () => navigation.navigate("MyAppointments") },
        { id: "2", title: "My Estimates", icon: CurrencyDollarIcon, onPress: () => navigation.navigate("MyEstimates") },
        { id: "3", title: "My Second Opinions", icon: ChatBubbleLeftRightIcon, onPress: () => navigation.navigate("MySecondOpinions") },
        { id: "4", title: "My Insurance", icon: HeartIcon, onPress: () => navigation.navigate("MyInsurance") },

        { id: "6", title: "Help and Support", icon: LifebuoyIcon, onPress: () => navigation.navigate("HelpSupport") },
        { id: "7", title: "Terms and Conditions", icon: ShieldCheckIcon, onPress: () => console.log("Terms") },
        { id: "5", title: "Settings", icon: Cog6ToothIcon, onPress: () => navigation.navigate("Settings") },
        { id: "8", title: "Log Out", icon: ArrowRightOnRectangleIcon, onPress: () => console.log("Logout"), logout: true }
    ]
    const [isLogoutVisible, setLogoutVisible] = useState(false);
    const navigation = useNavigation();
    const handleLogout = async () => {


        await logout();
        // logout();
        setLogoutVisible(false);

    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeAreaContainer}>

                <ScreenHeader
                    title="Profile"
                    onBackPress={() => navigation.goBack()}
                // RightIcon={CalendarIcon} // Optional Right Icon
                // onRightPress={() => console.log("Calendar Pressed")                    }
                />
                <ScrollView >
                    <View style={styles.container}>

                        {
                            user && (
                                <>
                                    {user.avatar ?
                                        <Image source={{}} style={styles.profileAvatar} />
                                        : (
                                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                                                <View style={[styles.profileAvatar, styles.profileAvatorAltImg]}>
                                                    <Text style={styles.profileAvatarText}>{user.name && Array.from(user.name)[0]}</Text>
                                                </View>
                                            </View>
                                        )}

                                    <View style={{ marginBottom: 16 }}>
                                        <Text style={[styles.textCenter, styles.profileUserName]}>{user.name}</Text>
                                        <Text style={[styles.textCenter, styles.textGrey]}>{user.phone}</Text>
                                    </View>
                                </>
                            )
                        }


                        <FlatList
                            data={menuItems} keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={[styles.menuItem, item.logout && styles.logoutItem]} onPress={item.logout ? () => setLogoutVisible(true) : item.onPress}>
                                    <item.icon size={22} color={item.logout ? "#E63946" : "#4A4A4A"} />
                                    <Text style={[styles.menuText, item.logout && styles.logoutText]}>{item.title}</Text>
                                    <ChevronRightIcon size={18} color="#B0B0B0" />
                                </TouchableOpacity>
                            )} />

                    </View>
                </ScrollView>


            </SafeAreaView>

            <BottomSheetDialog
                visible={isLogoutVisible}
                title="Logout"
                message="Are you sure you want to log out?"
                onConfirm={handleLogout}
                onCancel={() => setLogoutVisible(false)}
            />
        </SafeAreaProvider >

    );
}