import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../theme/ThemeProvider";
import { practiseYearCalculator } from "../../helpers/practiseyears";

export default function DentistItem({ dentist, handleSelect, isSelected }) {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        wrapper: {

            flexDirection: "row",
            // justifyContent: "space-between",
            marginVertical: 6,
            padding: 8,
            alignContent: "flex-start",
            borderColor: theme.border,
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 5,
            alignItems: "center",
            backgroundColor: theme.white,
            borderColor: isSelected ? theme.blue : theme.border
        },

        dentistName: {
            fontFamily: theme.font600,
            fontSize: 16,
            textAlign: "left"
        },
        practise_from: {
            fontFamily: theme.font400,
        }
    });




    return (
        <>
            <TouchableOpacity
                style={styles.wrapper}

                onPress={handleSelect}
            >

                <Image source={{ uri: dentist.photo_url ?? 'https://placehold.co/120x120.png' }}

                    style={{
                        width: 90, height: 90, marginEnd: 8,
                        resizeMode: 'cover',
                        borderRadius: 6,
                    }}
                />



                <View>

                    <Text style={styles.dentistName}>{dentist?.name}

                    </Text>
                    <Text style={styles.practise_from}>{practiseYearCalculator(dentist?.practise_from)} years of Practise</Text>

                   
                </View>


            </TouchableOpacity>
        </>
    )
}