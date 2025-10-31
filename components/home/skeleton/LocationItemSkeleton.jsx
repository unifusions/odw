import { Dimensions, Text, View } from "react-native";
import LoadingDots from "../../LoadingDots";
import { useTheme } from "../../../theme/ThemeProvider";
import Skeleton from "./Skeleton";
import SectionHeaderSkeleton from "./SectionHeaderSkeleton";


export default function LocationHomeSkeleton() {
    const screenWidth = Dimensions.get("window").width;
    const imageWidth = screenWidth / 3; // Fits 4 items per row with spacing
    const { theme } = useTheme();
    return (
        <>
            <SectionHeaderSkeleton showLink={true} />
            <View style={{
                marginHorizontal: "auto",
                width: '100%',


                // flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 32 
            }}>
                {
                    Array.from({ length: 2 }).map((_, index) => (
                        <View key={index}  >
                            <View style={{
                                flexDirection: "row",
                                marginBottom: 16,
                                alignItems: "center"
                            }}>
                                <Skeleton height={imageWidth} width={imageWidth} style={{
                                    borderRadius: 20,
                                    marginEnd: 18
                                }} />

                                <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }}>
                                    <Skeleton height={20} width="100%" style={{ marginBottom: 6 }} />
                                    <Skeleton height={15} width="40%" style={{ marginBottom: 16 }} />

                                    <Skeleton height={15} width="80%" style={{ marginBottom: 6 }} />
                                    <Skeleton height={15} width="80%" style={{ marginBottom: 6 }} />
                                    <Skeleton height={15} width="80%" style={{ marginBottom: 6 }} />
                                </View>

                            </View>
                        </View>
                    ))}
                {/* <LoadingServiceItem /> */}

            </View>
        </>

    )
}