import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import useSettings from "../../hooks/useSettings";
import LoadingDots from "../../components/LoadingDots";
import { useTheme } from "../../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import Skeleton from "../../components/home/skeleton/Skeleton";

export default function SpecialistSection() {
    const { theme } = useTheme();
    const { height } = Dimensions.get('window');
    const { settings, loading } = useSettings();
    const bannerSetting = settings?.settings?.find(item => item.key === "book_a_specialist_banner");
    const navigation = useNavigation();
    if (!bannerSetting) {
        return null; // or return a placeholder component
    }

    return (
        <>
            {loading ? <Skeleton height={(height / 5)} width="100%" style={{ marginBottom: 16, borderRadius: 16, }} />

                :


                <View style={{ height: (height / 5), width: "100%", marginBottom: 16, borderRadius: 16, }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Specialist")} style={{ height: "100%" }}>
                        <View style={{ height: (height / 5), width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                            <Image source={{ uri: bannerSetting.file_url }} style={{
                                width: '100%',
                                height: 'auto',
                                resizeMode: 'cover',
                                borderRadius: 16,
                            }} />

                        </View>
                    </TouchableOpacity>
                </View>

                // (settings.settings[0].key === 'book_a_specialist_banner' ? <>
                // <Text>
                // {settings.settings[0].file_url}
                // </Text>
                // </> : null)


            }
        </>

    )
}