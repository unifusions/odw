import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SelectInput = ({ data }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSearch = (text) => {
    setQuery(text);
    setFilteredData(
      data.filter(item => item.toLowerCase().includes(text.toLowerCase()))
    );
    setShowDropdown(true);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    setQuery(value);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={handleSearch}
        onFocus={() => setShowDropdown(true)}
        style={styles.input}
        placeholder="Select an option"
      />
      {showDropdown && filteredData.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Text style={styles.option}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    zIndex: 10, // Ensure dropdown appears on top
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 150,
  },
  option: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});

export default SelectInput;
