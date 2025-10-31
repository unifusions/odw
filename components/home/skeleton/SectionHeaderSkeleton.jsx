import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Skeleton from "./Skeleton";
import { useTheme } from "../../../theme/ThemeProvider";

export default function SectionHeaderSkeleton({ showLink = false }) {

    const { theme } = useTheme();
    const styles = StyleSheet.create({
        sectionContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12

        },

    })
    return (
        <>
            <View style={styles.sectionContainer}>
                <Skeleton height={20} width="50%" />
                {
                    showLink && <Skeleton width="10%" height={15} />
                }
            </View>
        </>
    )
}