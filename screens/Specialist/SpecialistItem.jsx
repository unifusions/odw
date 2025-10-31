import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../theme/ThemeProvider";
import { MapIcon } from "react-native-heroicons/outline";
 
import { Image, Text, TouchableOpacity, View } from "react-native";
import { practiseYearCalculator } from "../../helpers/practiseyears";

export default function SpecialistItem({item}) {
    const { theme } = useTheme();
    const navigation = useNavigation();

    return (
        <>
            <TouchableOpacity
                style={{
                    backgroundColor: theme.white,
                    padding: 12,
                    borderRadius: 12,
                    marginBottom: 12,
                    flex:1
                }}

                onPress={() => navigation.navigate("ShowSpecialist", {
                    specialist: item

                })}
            >

                <View style={{  flex: 1, flexDirection: "row", alignContent: "flex-start", alignItems: "flex-start", width:"100%" }}>

                    <Image source={{ uri: item?.photo_url }} height={90} width={90}
                        style={{ marginEnd: 12, borderRadius: 12 }} />
                    <View style={{ flex:1 }} >
                        <View style={{ flex:1, borderBottomWidth: 1, borderBottomColor: theme.border, paddingBottom: 6, marginBottom: 6,  }}>
                            <Text  numberOfLines={4} style={{ fontFamily: theme.font700, fontSize: 16, 
                             ellipsizeMode:"tail", flexShrink:1,
                            flexWrap:"wrap"
  }}>{item?.name}</Text>
                            <Text style={{ fontFamily: theme.font400, fontSize: 16 }}>{practiseYearCalculator(item?.practise_from)} years of Practise</Text>

                        </View>

                        <View style={{ flexDirection: "row", paddingTop: 6, alignItems: "center" }}>
                            <MapIcon size={20} style={{ marginEnd: 6 }} />
                            <Text style={{ fontFamily: theme.font400, fontSize: 16 }}> {item?.clinics[0]?.name}</Text>
                        </View>
                    </View>
                </View>


            </TouchableOpacity>
        </>
    )
}