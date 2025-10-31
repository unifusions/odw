import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider";

export default function ServiceItem({ item, handlePress }) {

    const { theme } = useTheme();

    const styles = StyleSheet.create({

        touchableContainer: {
            flex: 1,
            height: 100,
            flexBasis: "25%",
            aspectRatio: 1,
            marginVertical: 12,
            justifyContent: "center",
            alignItems: "center", padding: 12,
        },

        serviceTitle: {
            fontSize: 12,
            textAlign: "center",
            fontFamily: theme.font600
        },
        imageContainer: { width: 50, height: 50, marginBottom: 9 },

        image: {
            flex: 1, width: undefined, height: undefined,
            resizeMode: 'contain',
        }
    });
    return (
        <TouchableOpacity style={styles.touchableContainer} onPress={handlePress}>
            <View style={styles.imageContainer}>

                <Image source={{ uri: item.image_path_url }} style={styles.image} />
            </View>
            <Text style={styles.serviceTitle}>{item.name}</Text>

        </TouchableOpacity >
    )

}