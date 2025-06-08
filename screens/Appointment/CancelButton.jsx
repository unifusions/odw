import { Text, TouchableOpacity } from "react-native";

const CancelButton = ({ theme, handlePress }) => {
    return (
        <>

            <TouchableOpacity style={{ paddingVertical: 10 }} onPress={handlePress}>
                <Text>Cancel</Text>
            </TouchableOpacity>

        </>
    )
}

export default CancelButton;