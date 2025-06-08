import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../theme/ThemeProvider";

export default function DentistItem({ dentist, handleSelect, isSelected }) {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        wrapper: {

            flexDirection: "row",
            // justifyContent: "space-between",
            marginVertical: 12,
            padding: 8,
            alignContent: "flex-start",
            borderColor: theme.border,
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 5,

            borderColor: isSelected ? theme.blue : theme.border
        },

        dentistName: {
            fontFamily: theme.font600,
            fontSize: 16,
            textAlign: "left"
        }
    });
    return (
        <>
            <TouchableOpacity
                style={styles.wrapper}

                onPress={handleSelect}
            >

                <Image source={{ uri: 'https://placehold.co/120x120.png' }}

                    style={{
                        width: 100, height: 100, marginEnd: 8,
                        resizeMode: 'contain',
                        borderRadius: 6,
                    }}
                />


                <View>
                    <Text style={styles.dentistName}>{dentist.name}</Text>
                    <Text>{dentist.practise_from}</Text>
                </View>


            </TouchableOpacity>
        </>
    )
}