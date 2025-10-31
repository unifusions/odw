import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { useRoute } from "@react-navigation/native";

import { APP_URL } from "../../config";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
 
import Card from "../../components/Card";
import { CheckBadgeIcon, ChevronRightIcon } from "react-native-heroicons/outline";
import { useTheme } from "../../theme/ThemeProvider";

export default function ShowEstimateReply({ reply }) {


    // const fileUrl = APP_URL + reply.file_url;
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);

    const [localUri, setLocalUri] = useState(null);

    const { theme } = useTheme();

    const handleViewFile = async () => {

        const remoteUri = `${APP_URL}/files?path=${reply.path}`;
        const localFileUri = `${FileSystem.documentDirectory}${reply?.file_name}`;

        try {
            setLoading(true);

            // Step 1: Check if file already exists
            const fileInfo = await FileSystem.getInfoAsync(localFileUri);

            if (!fileInfo.exists) {
                console.log("⬇️ Downloading file...");
                const downloadResumable = FileSystem.createDownloadResumable(
                    remoteUri,
                    localFileUri,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/pdf",
                        },
                    }
                );

                const { uri } = await downloadResumable.downloadAsync();
                console.log("✅ File downloaded to:", uri);
                setLocalUri(uri);
            } else {
                console.log("✅ File already exists:", localFileUri);
                setLocalUri(localFileUri);
            }

            // Step 2: Open or share the file
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(localFileUri);
            } else {
                Alert.alert("Info", "Sharing is not available on this device.");
            }
        } catch (error) {
            console.error("Error handling file:", error);
            Alert.alert("Error", "Unable to open or download file.");
        } finally {
            setLoading(false);
        }
    }

    return (

        <>

            <TouchableOpacity onPress={handleViewFile}>
                <Card>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <CheckBadgeIcon color={theme.success} size={40} />
                            <Text style={{ fontFamily: theme.font700 }}>Your second opinion is now available


                            </Text>
                        </View>
                        <ChevronRightIcon size={18} color="#B0B0B0" />

                    </View>

                </Card>
            </TouchableOpacity>

        </>


    )
}