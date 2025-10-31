import { useContext, useState, memo, useCallback } from "react"; // Import memo
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/outline";
import Badge from "../../components/Badge";
import SearchBox from "../../components/SearchBox";

export default function CareSelect() {
    const { theme } = useContext(ThemeContext);
    const [services, setServices] = useState([
        
    ]);
    const gStyles = getGlobalStyles(theme);
    const [filteredData, setFilteredData] = useState(services);
    const [searchText, setSearchText] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const styles = StyleSheet.create({}); // Consider moving static styles outside the component if they don't depend on theme

    const handleSearch = (text) => {
        setSearchText(text);
        const lowercasedText = text.toLowerCase();
        const filtered = services.filter(item => {
            const nameMatches = item.name.toLowerCase().includes(lowercasedText);
            const codeMatches = item.code && item.code.toLowerCase().includes(lowercasedText);
            return nameMatches || codeMatches;
        });
        setFilteredData(filtered);
    };

    const handleItemSelect = useCallback((itemId) => {
        setSelectedServices((prev) => 
            prev.includes(itemId)
                ? prev.filter((id) => id !== itemId)
                : [...prev, itemId]
        );
    }, []);

    // Memoize the Item component to prevent unnecessary re-renders of list items
    const Item = (({ item, isSelected, onPress }) => {
        const { theme } = useContext(ThemeContext); // Access theme inside the memoized component if needed for styling
        return (
            <Pressable
                onPress={onPress} // Call the passed onPress handler
                style={{
                    padding: 16,
                    marginBottom: 12,
                    backgroundColor: isSelected ? '#e6f7ff' : '#fff',
                    borderRadius: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#ccc',
                }}
            >
                <>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.code}</Text>
                    <Text style={{ fontSize: 14 }}>{item.name}</Text>
                </View>
                {/* {isSelected ? (
                    <MinusCircleIcon color={theme.danger} />
                ) : (
                    <PlusCircleIcon color={theme.success} />
                )} */}
                </>
            </Pressable>
        );
    });

    return (
        <>
            <View style={{ flex: 1 }}>
                <Text style={gStyles.stepFormScreenTitle}>
                    Choose Your Dental Care
                </Text>
                <SearchBox onSearch={handleSearch} />
                {/* {filteredData.map((item) =>
                    <Item
                        key={item.id}
                        item={item}
                        isSelected={selectedServices.includes(item.id)}
                        onPress={() => handleItemSelect(item.id)} // Pass the handler down
                    />
                )} */}
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <Item
                            item={item}
                            isSelected={selectedServices.includes(item.id)}
                            onPress={() => handleItemSelect(item.id)} // Pass the handler down
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    extraData={selectedServices}
                    keyboardShouldPersistTaps="handled"
                />
            </View>
        </>
    );
}