import { View, Text, Button, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import getGlobalStyles from "../../theme/globalStyles";
import { useContext, useState } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
import { ArrowRightOnRectangleIcon, BellIcon, ChevronRightIcon, Cog6ToothIcon, HeartIcon, QuestionMarkCircleIcon, ShieldCheckIcon, UserIcon } from "react-native-heroicons/outline";
import BottomSheetDialog from "../../components/BottomSheetDialog";

export default function ProfileScreen({ navigation }) {

    const { theme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);

    const menuItems = [
        { id: "1", title: "Edit Profile", icon: UserIcon, onPress: () => console.log("Edit Profile") },
        { id: "2", title: "Favorite", icon: HeartIcon, onPress: () => console.log("Favorite") },
        { id: "3", title: "Notifications", icon: BellIcon, onPress: () => console.log("Notifications") },
        { id: "4", title: "Settings", icon: Cog6ToothIcon, onPress: () => console.log("Settings") },
        { id: "5", title: "Help and Support", icon: QuestionMarkCircleIcon, onPress: () => console.log("Help") },
        { id: "6", title: "Terms and Conditions", icon: ShieldCheckIcon, onPress: () => console.log("Terms") },
        { id: "7", title: "Log Out", icon: ArrowRightOnRectangleIcon, onPress: () => console.log("Logout"), logout: true },
    ]
    const [isLogoutVisible, setLogoutVisible] = useState(false);

    const handleLogout = () => {
        console.log("User logged out");
        setLogoutVisible(false);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={[styles.screenTitle, styles.textCenter]}>Profile</Text>
                    <Image source={{}} style={styles.profileAvatar} />
                    <View style={{ marginBottom: 16 }}>
                        <Text style={[styles.textCenter, styles.profileUserName]}>User Name</Text>
                        <Text style={[styles.textCenter, styles.textGrey]}>+1 355 7856 965</Text>
                    </View>


                    <FlatList
                        data={menuItems} keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.menuItem, item.logout && styles.logoutItem]} onPress={item.logout ? () => setLogoutVisible(true) : item.onPress}>
                                <item.icon size={22} color={item.logout ? "#E63946" : "#4A4A4A"} />
                                <Text style={[styles.menuText, item.logout && styles.logoutText]}>{item.title}</Text>
                                <ChevronRightIcon size={18} color="#B0B0B0" />
                            </TouchableOpacity>
                        )} />
                    {/* <Button title="Personal Details" onPress={() => navigation.navigate("PersonalDetails")} />
                    <Button title="Logout" onPress={() => console.log("Logout Functionality Here")} /> */}
                </View>

            </SafeAreaView>

            <BottomSheetDialog
                visible={isLogoutVisible}
                title="Logout"
                message="Are you sure you want to log out?"
                onConfirm={handleLogout}
                onCancel={() => setLogoutVisible(false)}
            />
        </SafeAreaProvider>

    );
}