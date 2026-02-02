import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useAuth } from "../context/AuthContext";
import SafeAreaContainer from "../components/SafeAreaContainer";

export default function PdfScreen({ screenTitle, route }) {
  const {token} = useAuth();
  const { pdfUrl } = route.params; // URL from Laravel

   const source = {
    uri: pdfUrl,
    headers: {
      Authorization: `Bearer ${token}`, // if Laravel API is protected
    },
    cache: true,
  };  return (
    <SafeAreaContainer screenTitle={screenTitle ?? 'File Preview'}
            allowedBack={true}>
      <WebView
        source={source}
        startInLoadingState
        renderLoading={() => <ActivityIndicator style={{ marginTop: 20 }} />}
      />
      
    </SafeAreaContainer>
  );
}
