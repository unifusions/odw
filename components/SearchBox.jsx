
import React, { useState, useCallback, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { ThemeContext } from '../theme/ThemeProvider';

const SearchBox = ({ onSearch}) => {

    const { theme } = useContext(ThemeContext);
    const [searchText, setSearchText] = useState('');
    const debounceDelay = 200;
    // Debounced search function
    const debouncedOnSearch = useCallback(
        (text) => {
            if (onSearch) {
                onSearch(text);
            }
        },
        [onSearch]
    );
    useEffect(() => {
        if (debounceDelay > 0) {
            const handler = setTimeout(() => {
                debouncedOnSearch(searchText);
            }, debounceDelay);

            return () => {
                clearTimeout(handler);
            };
        } else if (searchText !== '') {
            debouncedOnSearch(searchText);
        }
    }, [searchText, debouncedOnSearch, debounceDelay]);
    const handleChangeText = (text) => {
        setSearchText(text);
        if (debounceDelay === 0 && onSearch) {
            onSearch(text); // Call immediately if no debounce
        }
    };
    const handleClearText = useCallback(() => {
        setSearchText('');
        if (onSearch) {
            onSearch(''); // Notify parent of cleared text
        }
    }, [onSearch]);

    const styles = StyleSheet.create({
        container: {

            flexDirection: 'row',
            alignItems: 'center',
            // padding: 10,
            // backgroundColor: '#f0f0f0',
            borderRadius: 5, // Added a default border radius for a common look
            borderWidth: 1,
            height: 50,
            borderColor: 'gray',
            marginBottom: 16
        },
        input: {

            flex: 1,

            fontFamily: theme.font500,
            fontSize: 16,
            paddingHorizontal: 10,
            backgroundColor: 'white',
        },
        clearButton: {
            marginLeft: 8,
            padding: 4,
            borderRadius: 15, // Make it circular by default
            backgroundColor: 'lightgray',
            marginEnd: 8
        },
        clearButtonText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
        },
    });

    return (
        <View style={[styles.container]}>
            <MagnifyingGlassIcon color='gray' style={{ marginStart: 8 }} />
            <TextInput
                style={[styles.input]}
                placeholder="Search"
                value={searchText}
                onChangeText={handleChangeText}
            />
            {searchText.length > 0 && (
                <TouchableOpacity onPress={handleClearText} style={[styles.clearButton]}>
                    <Text style={[styles.clearButtonText]}>
                        <XMarkIcon size={16} />
                    </Text>
                </TouchableOpacity>
            )}
        </View>

    );
}

export default SearchBox;