import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import { useNavigation, useRoute } from "@react-navigation/native";

import { APP_URL } from "../../config";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

import Card from "../../components/Card";
import { CheckBadgeIcon, ChevronRightIcon } from "react-native-heroicons/outline";
import { useTheme } from "../../theme/ThemeProvider";
import * as Linking from 'expo-linking';
import { WebView } from 'react-native-webview';




export default function ShowSoReply({ reply }) {


    // const fileUrl = APP_URL + reply.file_url;
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);

    const [localUri, setLocalUri] = useState(null);
 const remoteUri = `${APP_URL}/files?path=${reply.path}`;
    const { theme } = useTheme();
    const navigation = useNavigation();
    const handleViewFile = async () => {

        const remoteUri = `${APP_URL}/files?path=${reply.path}`;
        const localFileUri = `${FileSystem.documentDirectory}${reply?.file_name}`;

        try {
            setLoading(true);

             

            const { uri } = await FileSystem.downloadAsync(
                remoteUri,
                localFileUri,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/pdf",
                    },
                }
            );
            setLocalUri(uri);

            // console.log("✅ File downloaded to:", uri);
            // setLocalUri(uri);
            // } else {
            //     // console.log("✅ File already exists:", localFileUri);
            //     setLocalUri(localFileUri);
            // }
            // await Linking.openURL(localFileUri);

            // Step 2: Open or share the file
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(localFileUri);
            } else {
                Alert.alert("Info", "Sharing is not available on this device.");
            }

            // navigation.navigate("ShowSoReplyPdf", { uri: localUri });

        } catch (error) {
             Alert.alert("Error", "Unable to open or download file.");
        } finally {
            setLoading(false);
        }
    }

    return (

        <>
  

            {/* <TouchableOpacity onPress={handleViewFile}> */}
            <TouchableOpacity onPress={() => navigation.navigate("ShowPdf", {
                        pdfUrl: reply.file_url
                    })}>
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
            {/* {console.log(localUri)}
            {localUri && <WebView
                  style={{
                    flex: 1,
                    width: '100%',
                    height: 75
                    // alignSelf: 'stretch',
                  }}
                source={{ uri: localUri }}
                originWhitelist={['*']}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}

        onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
            setError(`WebView Error: ${nativeEvent.description}`);
          }}
            // On Android, Google's PDF viewer is used which works well.
            // On iOS, it will render the PDF directly in the WebView.
            />} */}

        </>


    )
}