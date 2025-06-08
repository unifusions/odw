import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { ThemeContext } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaContainer from "../components/SafeAreaContainer";
import { getDentalCare } from "../services/getDentalCare";
import SearchBox from "../components/SearchBox";
import Badge from "../components/Badge";

const CompareScreen = () => {
  const { theme, toggleTheme, resetTheme } = useContext(ThemeContext);
  const styles = getGlobalStyles(theme);

  const [dentalCares, setDentalCares] = useState({});

  const [searchText, setSearchText] = useState('');
  // const [data, setData] = useState([
  //   { id: '1', name: 'Apple' },
  //   { id: '2', name: 'Banana' },
  //   { id: '3', name: 'Cherry' },
  //   { id: '4', name: 'Date' },
  //   { id: '5', name: 'Elderberry' },
  // ]);
  const [filteredData, setFilteredData] = useState(dentalCares);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = dentalCares.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {



    getDentalCare().then(setDentalCares).catch(console.error);

  }, []);
  const ServiceCardView = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={{ borderWidth: 1, borderColor: theme.border, borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <Badge badgeText={item.category_id} />
          <Text style={{
            fontFamily: theme.font700, fontSize: 18, letterSpacing: -0.2, paddingBottom: 12, marginBottom: 12,
            borderBottomColor: theme.border, borderStyle: "solid", borderBottomWidth: 1,
          }}>{item.name} </Text>


          <View
            style={{
              flex: 1,
              flexDirection: "row", justifyContent: "space-between"
            }}
          >

            <View>
              <Text style={{ color: theme.gray, fontFamily: theme.font400 }}>Average National Cost</Text>
              <Text style={{ fontFamily: theme.font700, fontSize: 20, alignSelf: "flex-start" }}>
                <Text style={{ fontSize: 16 }}>$</Text> {item.national_cost}
              </Text>
            </View>

            <View>
              <Text style={{ fontFamily: theme.font400, alignSelf: "flex-end" }}>ODW Cost</Text>
              <Text style={{ fontFamily: theme.font700, fontSize: 20, alignSelf: "flex-end" }}>
                <Text style={{ fontSize: 16 }}>$</Text> {item.odw_cost}
              </Text>
            </View>


          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaContainer screenTitle="Compare Costs">
      <SearchBox onSearch={handleSearch}







        debounceDelay={200} // Example of using debounce
      />
      {/* <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.listItem}>{item.name}</Text>}
      /> */}

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ServiceCardView item={item} />}
      />

    </SafeAreaContainer>


  );
};

export default CompareScreen;
