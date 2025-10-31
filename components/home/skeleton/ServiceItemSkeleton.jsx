import { Dimensions, View } from "react-native";
import LoadingDots from "../../LoadingDots";
import Skeleton from "./Skeleton";
import SectionHeaderSkeleton from "./SectionHeaderSkeleton";

const LoadingServiceItem = () => {
    const { width, height } = Dimensions.get('window');
    const loadingLength = 4;

    for (let index = 0; index < loadingLength; index++) {
        return (
            <View style={{
                flex: 1,
                minWidth: (width / 4.5),
                maxWidth: (width / 4.5),
                height: 100,
                justifyContent: "center",
                alignItems: "center", padding: 8, marginBottom: 18
            }}  >
                <Skeleton height="70%" width="100%" style={{ marginBottom: 12 }} />
                <Skeleton height={15} width="70%" style={{ marginBottom: 6 }} />

            </View>
        )

    }

}

export default function ServiceItemSkeleton() {
    return (
        <>
        <SectionHeaderSkeleton showLink={true}/>
            <View style={{
                marginHorizontal: "auto",
                width: '100%',
                flexDirection: "row",
                flexWrap: "wrap",

              
            }}>
                {
                    Array.from({ length: 8 }).map((_, index) => (
                        <LoadingServiceItem key={index} />
                    ))}
             

            </View>
        </>

    )

}