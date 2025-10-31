import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../theme/ThemeProvider"
import { FolderPlusIcon } from "react-native-heroicons/outline";

export default function UploadDocuments({handlePress }) {

    const { theme } = useTheme();
    return (
        <>
            <Text style={{ fontFamily: theme.font600, fontSize: 14, marginBottom: 6 }} >Upload Any Relevant Documents</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, }}>
                <TouchableOpacity style={{
                    flex: 1,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#99A3A4', // Light grey for dashed border effect
                    borderStyle: 'dashed',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                    maxHeight: 120,
                    marginBottom: 10
                }} onPress={handlePress}>

                    <>
                        <FolderPlusIcon size={36} color={theme.primary} style={{ marginEnd: 16 }} />
                        <Text style={{ fontFamily: theme.font500, fontSize: 12, }}>E.g. estimates, X-rays, treatment Plan</Text>
                    </>

                </TouchableOpacity>



            </View>

        </>
    )
}