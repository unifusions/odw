import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import { CheckCircleIcon as CheckCircleIconOutline } from "react-native-heroicons/outline";

export default function CategoryList({ categories, selectedId, onSelect }) {

    const { theme } = useTheme();
    const gStyles = getGlobalStyles(theme);
    const styles = StyleSheet.create({


        itemContainer: {
            backgroundColor: theme.white,
            borderWidth: 1.5,
            borderStyle: 'solid',
            borderColor: theme.border,
            borderRadius: 3,
            marginBottom: 8,
            padding: 16,
            elevation: 1,
        },

        title: {
            fontSize: 16,
            letterSpacing: -0.25,
            fontFamily: theme.font700,

        },

        image: {

            flex: 1,
            flexGrow: 1

        }
    });


    const RenderItem = ({ item }) => {


        const isItemSelected = selectedId === item.id;



        return (
            <TouchableOpacity style={{


                padding: 8, marginBottom: 8,

            }} onPress={() => onSelect(item)} >

                <View style={[gStyles.flexRow, { justifyContent: 'space-between', width: "100%" }]}>
                    <View style={{ marginEnd: 8 }}>

                        {isItemSelected ? <CheckCircleIcon color={theme.blue} size={36} /> : <CheckCircleIconOutline color={theme.gray} size={36} />}
                    </View>
                    <View style={{ flex: 3 }}>


                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ fontFamily: theme.font700, fontSize: 16, color: theme.text, marginEnd: 8 }}>{item.name}</Text>

                            <Text style={{ fontFamily: theme.font500, fontSize: 12, color: theme.text }}>
                                {item.medical_name}
                            </Text>
                        </View>


                        <Text style={{ textAlign: 'justify', color: theme.mutedText, fontFamily: theme.font400, fontSize: 13, }} numberOfLines={2}
                            ellipsizeMode="tail">{item.desc}</Text>
                    </View>



                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}

            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}



            ItemSeparatorComponent={() => (
                <View style={{ backgroundColor: theme.border, height: 2 }} />
            )}
            style={{ backgroundColor: 'white', marginBottom: 10 }}

            renderItem={({ item }) => (
                <RenderItem item={item} />
            )} />
    )

}