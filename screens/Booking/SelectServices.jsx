import { View } from "react-native";

import BookingWrapper from "./BookingWrapper";
import { useState } from "react";
import LoadingDots from "../../components/LoadingDots";

export default function SelectServices() {

    const [loading, setLoading] = useState(true);

    return (
        <BookingWrapper screenTitle="Select Services">
            {loading ?
                <View style={{ flex: 1, justifyContent: "center" }}><LoadingDots />
                </View> :
                <>

                    <View style={{ height: "100%" }}>
                        <FlatList

                            ItemSeparatorComponent={() => (
                                <View style={{ backgroundColor: theme.border, height: 2 }} />
                            )}
                            data={services}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}

                            renderItem={({ item }) => (
                                <RenderItem item={item} />
                            )}
                            style={{ marginBottom: 80, backgroundColor: theme.cardBackground, padding: 8, borderRadius: 8 }}
                        />
                    </View>

                </>
            }
        </BookingWrapper>
    )
}