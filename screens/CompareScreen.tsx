import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList, TextInput } from "react-native";
import { ThemeContext, useTheme } from "../theme/ThemeProvider";
import getGlobalStyles from "../theme/globalStyles";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaContainer from "../components/SafeAreaContainer";
import { getDentalCare } from "../services/getDentalCare";
import SearchBox from "../components/SearchBox";
import Badge from "../components/Badge";
import LoadingDots from "../components/LoadingDots";
import api from "../services/api";
import useDentalCares from "../hooks/useDentalCares";


const RenderCategory = ({ item, handlePress, isSelected }) => {
  const { theme } = useTheme();

  return (

    <TouchableOpacity
      onPress={handlePress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: isSelected ? theme.primary : theme.border,
        borderRadius: 20,
        marginHorizontal: 4,
        alignItems: "center",
      }}
    >

      <Text style={{
        fontFamily:theme.font400,
        fontSize: 12,
        color: isSelected ? theme.white : theme.mutedText
      }}>{item.name}</Text>
    </TouchableOpacity>


  )
}
const ServiceCardView = ({ item }) => {

  const { theme } = useTheme();
  const medicalNames = item?.medical_name.split(", ").map(mn => mn.trim());

  return (

    <View style={{ backgroundColor: theme.white, borderWidth: 1, borderColor: theme.border, borderRadius: 8, padding: 16, marginBottom: 16 }}>

      <View style={{
        paddingBottom: 12,
        marginBottom: 12, borderBottomColor: theme.border, borderStyle: "solid", borderBottomWidth: 1
      }}>
        <Text style={{
          fontFamily: theme.font600, fontSize: 16,
          letterSpacing: -0.2,
          marginBottom: 6,

        }}>{item.name} </Text>

        <Text style={{ fontFamily: theme.font500, fontSize: 14, color: theme.gray }}>
          {item.medical_name}
          {/* {item.featured && 'F'} */}
          {/* {JSON.stringify(item.categories, null, 2)} */}
        </Text>

        {/* <FlatList
          data={medicalNames}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <>
           
          </>}
        /> */}

      </View>



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

        {/* <Text>{JSON.stringify(medicalNames)}</Text> */}
      </View>
    </View>

  )
}


const CompareScreen = () => {


  const { cares, categories, loading, error } = useDentalCares({});

  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");


  const filtered = useMemo(() => {
    let data = showAll ? [...cares] : cares.filter(s => s.featured);
    // if (!query) return cares;

    if (!showAll) {
      data = data.filter((s) => s.featured);
    }

    if (selectedCategory !== "All") {
      data = data.filter((item) =>
        item.categories?.some((cat) => cat.name === selectedCategory)
      );
    }

    if (query) {
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.code?.toLowerCase().includes(query.toLowerCase())
      );
    }

    data = data.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));

    return data;
  }, [query, cares, selectedCategory, showAll]);




  return (
    <SafeAreaContainer screenTitle="Compare Costs" allowedBack={true}>
      <SearchBox onSearch={setQuery} placeholder='Type to find procedures - name or code' />






      {loading ? <LoadingDots /> :
        <>

          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) =>
              <RenderCategory item={item}
                handlePress={() => setSelectedCategory(item.name)}
                isSelected={item.name === selectedCategory} />}

            style={{ height: 40, marginBottom: 16 }}
          />


          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id.toString()}

            showsVerticalScrollIndicator={false}

            renderItem={({ item }) => <ServiceCardView item={item} />}


          />

          <TouchableOpacity onPress={() => setShowAll(!showAll)}>
            <Text style={{ color: "blue" }}>
              {showAll ? "Show Featured" : "Show All"}
            </Text>
          </TouchableOpacity>
        </>


      }


    </SafeAreaContainer>


  );
};

export default CompareScreen;
