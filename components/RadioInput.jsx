import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../theme/ThemeProvider";

export default function RadioInput({ label, options, selectedOption, handleSelect }) {

    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        row: {
            justifyContent: 'space-between', // Distributes items evenly in a row
            marginBottom: 10,
            flexDirection: "row",
            flexWrap: 'wrap'
        },
        label: {

            fontSize: 16,
            color: '#666',
            zIndex: 1,
            fontFamily: theme.font500,
            marginBottom: 5
        },

        chip: {
            backgroundColor: '#e0e0e0',
            paddingVertical: 10,
            paddingHorizontal: 5, // Internal padding for text, consider this for total width
            borderRadius: 20,
            marginHorizontal: 5, // Margin between chips horizontally
            marginVertical: 5,
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 40, // Ensure a minimum height for chips
            width: "46%",
           
        },

        chipText:{
            fontFamily: theme.font500
        },


        chipSelected: {
            backgroundColor: theme.primary,
            color: theme.white
        },

        chipSelectedText : {
            color:theme.white,
            fontFamily: theme.font700
        }
    });
    return (
        <>
            <View>
                <Text style={styles.label}>{label}</Text>

                <View style={styles.row} >
                    {options.map((item) => {
                        const isSelected = selectedOption ? (item.id === selectedOption.id) : false;
                        return (
                            <>
                                <TouchableOpacity key={item.id} onPress={() => handleSelect(item)} style={[styles.chip, isSelected && styles.chipSelected]}>
                                    
                                        <Text style={[styles.chipText, isSelected && styles.chipSelectedText]}> {item.name}</Text>
                                     
                                </TouchableOpacity >
                            </>
                        )
                    })}
                </View>
            </View >

        </>
    )
}