import { TouchableOpacity, View, Text } from "react-native";

const NextButton = ({theme, handlePress}) => {
    return (
        <View >
            <TouchableOpacity style={{ padding: 10, backgroundColor: theme.primary, width: 100, borderColor: theme.primary, borderStyle: "solid", borderWidth: 1, }} onPress={handlePress} >
                <Text style={{ color: theme.white, textAlign: "center", fontFamily: theme.font600 }}>
                    Next
                </Text>
            </TouchableOpacity>
        </View>

    )
}

export default NextButton;
