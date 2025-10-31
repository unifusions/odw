import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import { useEffect, useMemo, useState } from "react";
import SearchBox from "./SearchBox";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/outline";

export default function ServicesList({ services, selectedIds, onSelect }) {
    const { theme } = useTheme();


    const [query, setQuery] = useState('');
    const [showAll, setShowAll] = useState(false);

    const filteredServices = useMemo(() => {
        let data = services || [];
        // if (!query) return cares;

        if (!showAll) {
            data = data.filter((s) => s?.featured);
        }

        if (query) {
            data = data.filter(
                (s) =>
                    s?.name.toLowerCase().includes(query.toLowerCase()) ||
                    s?.code.toLowerCase().includes(query.toLowerCase())
            );
        }
        return data;
    }, [query, services, showAll]);



    const handleItemPress = (item) => {
        const isSelected = selectedIds.some((i) => i.id === item.id);

        let newSelection;
        if (isSelected) {
            newSelection = selectedIds.filter((i) => i.id !== item.id);
        } else {
            newSelection = [...selectedIds, item];
        }

        onSelect(newSelection);

    };

    const RenderItem = ({ item }) => {

        const isSelected = selectedIds.some((i) => i.id === item.id);

        return (
            <TouchableOpacity
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
                onPress={() => handleItemPress(item)}
            >

                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, fontFamily: theme.font700, color: theme.primary }}>{item.code}</Text>
                    <Text style={{ fontSize: 14, fontFamily: theme.font500 }}>{item.name}</Text>
                </View>
                <Text>
                    {isSelected ? (
                        <MinusCircleIcon color={theme.danger} />
                    ) : (
                        <PlusCircleIcon color={theme.success} />
                    )}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <SearchBox onSearch={setQuery} placeholder='Type to find procedures - name or code' />
            <View style={{ justifyContent: "space-between", flexDirection: 'row', marginBottom: 6 }}>
                {!showAll ? <Text style={{ fontFamily: theme.font500, fontSize: 14 }}>Showing Featured ({filteredServices?.length})</Text> : <Text style={{ fontFamily: theme.font500, fontSize: 14 }}>Showing All ({filteredServices?.length})</Text>
                }
                <TouchableOpacity onPress={() => setShowAll(!showAll)}><Text style={{ fontFamily: theme.font500, fontSize: 14, color: theme.mutedText }}>Show {!showAll ? <Text>All</Text> : <Text>Featured</Text>}</Text></TouchableOpacity>}
            </View>

            <FlatList
                data={filteredServices}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            // extraData={selectedItems} // Ensures re-render on selection change
            />
        </>

    )
}