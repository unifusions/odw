
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function FileViewer({fileUrl}) {
    return (
        <View style={{ flex: 1 }}>
            <WebView source={{ uri: fileUrl }}
                style={{ flex: 1 }}>

            </WebView>
        </View>
    )
} 