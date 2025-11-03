

 
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import {  useTheme } from "../../theme/ThemeProvider";
import getGlobalStyles from "../../theme/globalStyles";



import { useNavigation } from "@react-navigation/native";
import SafeAreaContainer from "../../components/SafeAreaContainer";

import NewIcon from "./NewIcon";
import ReuseIcon from "./ReuseIcon";

const SecondOpinion = () => {
  const { theme } = useTheme();
  const styles = getGlobalStyles(theme);


  const navigation = useNavigation();



  const localStyles = StyleSheet.create({
    optionContainer: {
      flexDirection: "row",
      marginVertical: 6,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: theme.white,
      padding: 12,
      alignItems: "center",

    },

    title: {
      fontFamily: theme.font600,
      fontSize: 20,


      flexWrap: 1,
    },
    subtitle: {
      fontFamily: theme.font400,
      fontSize: 16,
      flex: 1,

      flexWrap: 1,
    }
  });
  return (
    <SafeAreaContainer>
      <View>
        <Text style={{ fontFamily: theme.font700, fontSize: 32, paddingEnd: 80, marginBottom: 16 }}>
          How would you like to get your second opinion?

        </Text>
      </View>

      <View style={{ backgroundColor: theme.white, padding: 12, borderRadius: 12 }}>


        <TouchableOpacity
          style={localStyles.optionContainer}
          onPress={() => navigation.navigate('SecondOpinionC')}
        >
          <View style={{ marginEnd: 12 }}>
            <NewIcon size={64} />
          </View>
          <View >

            <Text style={[localStyles.title]}>
              Help Me Understand My Options </Text>

            <View style={{ flexDirection: "row" }}>
              <Text style={localStyles.subtitle}>
                This is my first dental quote.

              </Text>
            </View>
          </View >
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.optionContainer}
          onPress={() => navigation.navigate('QuickOpinion')}

        >
          <View style={{ marginEnd: 12 }}>
            <Text><ReuseIcon size={64} /></Text>
          </View>


          <View  >

            <Text style={localStyles.title}>Compare Plans</Text>

            <View style={{ flexDirection: "row" }}>
              <Text style={localStyles.subtitle} >

                I already have a treatment plan or estimate
              </Text>
            </View>
          </View>
        </TouchableOpacity>

      </View >
    </SafeAreaContainer >
  );
};

export default SecondOpinion;
