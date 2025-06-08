import { TouchableOpacity , Text } from "react-native";

const PreviousButton = ({ theme, handlePress }) => {
    return (

        <TouchableOpacity style={{ padding: 10, backgroundColor: theme.white, borderColor: theme.blue, borderStyle: "solid", borderWidth: 1, width: 100, marginEnd: 6 }} onPress={handlePress} >
            <Text style={{ color: theme.blue, textAlign: "center", fontFamily: theme.font600 }}>Previous</Text>
        </TouchableOpacity>

    )
}

export default PreviousButton;