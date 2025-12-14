import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import getGlobalStyles from "../../theme/globalStyles";
import { useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { ArrowRightOnRectangleIcon, ChevronRightIcon, LifebuoyIcon, ShieldCheckIcon, UserIcon, UsersIcon } from "react-native-heroicons/outline";
import BottomSheetDialog from "../../components/BottomSheetDialog";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import Card from "../../components/Card";



export default function ProfileScreen() {

    const { theme } = useTheme();
    const styles = getGlobalStyles(theme);
    const navigation = useNavigation();

    const { user, patient, logout } = useAuth();
    const menuItems = [
        { id: "0", title: "Edit Profile", icon: UserIcon, onPress: () => navigation.navigate("EditProfile") },

        { id: "6", title: "Help & Support", icon: LifebuoyIcon, onPress: () => navigation.navigate("HelpSupport") },
        { id: "7", title: "Terms & Conditions", icon: ShieldCheckIcon, onPress: () => navigation.navigate("Terms") },

        { id: "8", title: "Log Out", icon: ArrowRightOnRectangleIcon, logout: true }
    ]
    const [isLogoutVisible, setLogoutVisible] = useState(false);

    const handleLogout = () => {


        logout();

        setLogoutVisible(false);

    };

    return (
        <SafeAreaContainer
            screenTitle="Profile" allowedBack={true}
        >


            <ScrollView showsVerticalScrollIndicator={false} >

           


                <Card>
                
                    <View style={{ marginVertical: 12, flexDirection: "row", alignItems: "center" }}>
                         
                        {patient?.avatar_url ?
                            <Image source={{ uri: patient?.avatar_url }} style={[styles.profileAvatar, { marginEnd: 12 }]} />
                            : <View style={[styles.profileAvatar, { marginEnd: 12, justifyContent: "center", alignItems: "center", backgroundColor: theme.border, borderRadius: 12 }]}>
                                <UsersIcon size={40} color={theme.gray} />
                            </View>
                        }
                        <View>
                            <Text style={{ fontFamily: theme.font700, fontSize: 16, marginBottom: 12 }}>{patient?.first_name} {patient?.last_name}</Text>
                            <Text style={{ fontFamily: theme.font400, marginBottom: 6 }}>{patient?.email} </Text>
                            <Text style={{ fontFamily: theme.font400 }}>{patient?.phone_number} </Text>
                        </View>
                    </View>
                </Card>

                <Card>

                    {menuItems.map((item) =>

                        <TouchableOpacity key={item.id} style={[styles.menuItem, item.logout && styles.logoutItem]} onPress={item.logout ? () => setLogoutVisible(true) : item.onPress}>
                            <item.icon size={22} color={item.logout ? "#E63946" : "#4A4A4A"} />
                            <Text style={[styles.menuText, item.logout && styles.logoutText]}>{item.title}</Text>
                            {!item.logout && <ChevronRightIcon size={18} color="#B0B0B0" />}
                        </TouchableOpacity>

                    )}

                </Card>



            </ScrollView>




            <BottomSheetDialog
                visible={isLogoutVisible}
                title="Logout"
                message="Are you sure you want to log out?"
                onConfirm={handleLogout}
                onCancel={() => setLogoutVisible(false)}
                confirmText="Yes, Logout"
            />
        </SafeAreaContainer >

    );
}