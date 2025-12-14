import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const NextButton = ({ theme, handlePress, label, isConfirm = false, fullWidth = false, isDisabled = false }) => {

    const styles = StyleSheet.create({
        confirmClass: {
            padding: 10,
            backgroundColor:
                theme.orange,
            width: fullWidth ? "100%" : 100,
            borderColor:
                theme.orange,
            borderStyle: "solid",
            borderWidth: 1,
        },
        nextClass: {
            padding: 10, backgroundColor: theme.primary,
            width: 100, borderColor: theme.primary, borderStyle: "solid", borderWidth: 1,
        },
        disableClass: {
            backgroundColor: 'lightgray',
            opacity: '0.5',
            borderColor: 'lightgray',
        }
    });

    return (
        <View >
            <TouchableOpacity style={[isConfirm ? styles.confirmClass : styles.nextClass, isDisabled && styles.disableClass]}
                disabled={isDisabled}
                onPress={handlePress} >
                <Text style={{ color: theme.white, textAlign: "center", fontFamily: theme.font600 }}>
                    {label ?? 'Next'}
                </Text>
            </TouchableOpacity>
        </View>

    )
}

export default NextButton;
