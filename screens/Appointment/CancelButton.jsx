import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CancelButton = ({ theme, handlePress }) => {


    const styles = StyleSheet.create({
        cancelText: {
            fontFamily: theme.font500,
            fontSize: 14,
            color: theme.danger
        }
    });
    return (
        <>

            <TouchableOpacity style={{ paddingVertical: 10 }} onPress={handlePress}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

        </>
    )
}

export default CancelButton;