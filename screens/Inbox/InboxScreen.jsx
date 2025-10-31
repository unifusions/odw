import { View, Text, TouchableOpacity,   useWindowDimensions, StyleSheet } from "react-native";
 
import { useContext, useState } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";
 
 
import SafeAreaContainer from "../../components/SafeAreaContainer";
 


import { TabView  } from 'react-native-tab-view';
import MyAppointments from "../Profile/MyAppointments";
import MyEstimates from "../Profile/MyEstimates";
import MySecondOpinions from "../Profile/MySecondOpinions";


 
export default function InboxScreen() {

    const { theme ={} } = useContext(ThemeContext);
 




    const lStyles = StyleSheet.create({
        tabBar: {
            flexDirection: 'row',
            
            paddingBottom: 8,
            
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        tabItem: {
            // paddingHorizontal: 20,
            // paddingVertical: 10,
            borderBottomWidth: 2,
            borderBottomColor: 'transparent',

        },
        activeTab: {
            backgroundColor: theme.primary,
            // borderBottomColor: '#000',
            padding: 10,
            borderRadius: 20
        },
        activeText: {
            // fontWeight: 'bold',
            color: '#FFF',
            fontFamily: theme.font700
        },
        inactiveText: {
            color: '#888',
            fontFamily: theme.font500
        },
    })

    const renderScene = ({ route }) => {
        switch (route.key) {
          case "first":
            return <MyAppointments />;
          case "second":
            return <MyEstimates />;
          case "third":
            return <MySecondOpinions />;
          default:
            return null;
        }
      };

    const routes = [
        { key: 'first', title: 'Appointments', },
        { key: 'second', title: 'Estimates' },
        { key: 'third', title: 'Second Opinions' },
    ];

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    const renderCustomTabBar = (props) => {
        return (
            <View style={lStyles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const isActive = index === i;
                    return (
                        <TouchableOpacity
                            key={i}
                            style={[lStyles.tabItem, isActive && lStyles.activeTab]}
                            onPress={() => setIndex(i)}
                        >
                            <Text style={isActive ? lStyles.activeText : lStyles.inactiveText}>
                                {route.title}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    return (
        <SafeAreaContainer
            screenTitle="Inbox" allowedBack={true}
        >
 
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderCustomTabBar}
            />



        </SafeAreaContainer >

    );
}