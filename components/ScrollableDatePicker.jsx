import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ThemeContext } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";

const ScrollableDatePicker = ({dates, handleSelect, selectedDate}) => {
  const {theme} = useContext(ThemeContext);
  const gStyles = getGlobalStyles(theme);

  return (
    <View style={styles.container}>

      <FlatList
        data={dates}
        horizontal
        keyExtractor={(item) => item.fullDate}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={gStyles.calenderContainer}
        renderItem={({ item }) => {
          const isSelected = item.fullDate === selectedDate;
          return (
            <TouchableOpacity
              style={[styles.dateItem, isSelected && styles.selectedDate]}
              onPress={()=>handleSelect(item)}
            >
              <Text style={[styles.dateText, isSelected && styles.selectedDateText, {fontFamily: theme.font600}]}>
                {item.dateNum}
              </Text>
              <Text style={[styles.dayText, isSelected && styles.selectedDayText, {fontFamily: theme.font500}]}>
                {item.day}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  list: {
    // paddingHorizontal: 10,
  },
  dateItem: {
    width: 50,
    alignItems: "center",
    paddingVertical: 10,
    // marginHorizontal: 5,
   
  },
  selectedDate: {
    backgroundColor: "#3B4F66",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  dayText: {
    fontSize: 14,
    color: "#666",
  },
  selectedDateText: {
    color: "#50E0D4",
  },
  selectedDayText:{
    color:"#FFFFFF"
  }
});

export default ScrollableDatePicker;
