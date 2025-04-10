import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


const ServiceDropdown = ({ services, onSelect, selectedService = null }) => {
  const [modalVisible, setModalVisible] = useState(false);


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Preferred Service</Text>

      {/* Dropdown Button */}
      <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
        <Text style={[styles.dropdownText, !selectedService && { color: "#9CA3AF" }]}>
          {selectedService && selectedService.name || "Select Service"}
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)} />
        <View style={styles.modal}>
          <FlatList
            data={services}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onSelect(item);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: 250 }} // Make dropdown scrollable
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#2d3748",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modal: {
    position: "absolute",
    top: "40%",
    left: "10%",
    right: "10%",
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
    paddingVertical: 10,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  optionText: {
    fontSize: 16,
    color: "#2d3748",
  },
});

export default ServiceDropdown;
