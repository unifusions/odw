import React, { useEffect, useState } from "react";
import { View, Dimensions, Text } from "react-native";
// import Pdf from "react-native-pdf";
import { WebView } from 'react-native-webview';
import * as FileSystem from "expo-file-system";
import { useRoute } from "@react-navigation/native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
export default function ShowSoReplyPdf() {
    const { uri } = useRoute().params;
    const [base64Uri, setBase64Uri] = useState('');
    useEffect(() => {
        const loadPdf = async () => {
            try {
                // Convert local PDF to Base64
                const base64 = await FileSystem.readAsStringAsync(uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                setBase64Uri(`data:application/pdf;base64,${base64}`);
            } catch (err) {
                console.log("PDF load error:", err);
                Alert.alert("Error", "Unable to load PDF.");
            }
        };

        loadPdf();
    }, [uri]);
    return (
        <SafeAreaContainer>
            <View style={{ flex: 1 }}>
                <Text>File Loaded</Text>
                {/* <Pdf
                source={{ uri }}
                onLoadComplete={(numberOfPages) => {
                    console.log(`Loaded ${numberOfPages} pages`);
                }}
                onError={(error) => {
                    console.log("PDF Error:", error);
                }}
                style={{ flex: 1, width: Dimensions.get("window").width }}
            /> */}
                {base64Uri &&
                    <WebView
                        source={{ uri: base64Uri }}
                        style={{ flex: 1 }}
                        scalesPageToFit={true}
                    />}
            </View>
        </SafeAreaContainer>

    )
}