import { Dimensions, Text, View } from "react-native";
import LoadingDots from "../../LoadingDots";
import { useTheme } from "../../../theme/ThemeProvider";
import Skeleton from "./Skeleton";
import SectionHeaderSkeleton from "./SectionHeaderSkeleton";


export default function DentistItemSkeleton() {
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
                    Array.from({ length: 4 }).map((_, index) => (
                        <View key={index} style={{
                            backgroundColor: theme.white,
                            padding: 12,
                            borderRadius: 12,
                            marginBottom: 12
                        }} >
                            <View style={{
                                flexDirection: "row",
                                alignContent: "flex-start",
                                alignItems: "center"
                            }}>
                                <Skeleton height={imageWidth} width={imageWidth} style={{
                                    borderRadius: 20,
                                    marginEnd: 18
                                }} />
                                {/*  style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start" }} */}

                                <View style={{ flexGrow: 1 }}>
                                    <View style={{ borderBottomWidth: 1, borderBottomColor: theme.border, paddingBottom: 6, marginBottom: 6 }}>
                                        {/* skeleton 2x */}
                                        <Skeleton height={25} width="100%" style={{ marginBottom: 6 }} />
                                        <Skeleton height={15} width="40%" style={{ marginBottom: 16 }} />
                                    </View>

                                    <View style={{ flexDirection: "row", paddingTop: 6, alignItems: "center" }}>
                                        {/* skeleton 1 */}<Skeleton height={20} width="50%" style={{ marginBottom: 6 }} />
                                    </View>
                                </View>



                            </View>
                        </View>
                    ))}
                {/* <LoadingServiceItem /> */}

            </View>
        </>

    )
}