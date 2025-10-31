import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, ScrollView } from "react-native";
import getGlobalStyles from "../../theme/globalStyles";
import { useEffect, useState } from "react";
import { getDentalServices } from "../../services/dentalServices";
import { CheckCircleIcon as CheckCircleIconOutline } from "react-native-heroicons/outline";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import NextButton from "./NextButton";
import CancelButton from "./CancelButton";
import ButtonWrapper from "./ButtonWrapper";
import NextPrevButtonWrapper from "./NextPrevButtonWrapper";
import PreviousButton from "./PreviousButton";
import Badge from "../../components/Badge";
import LoadingDots from "../../components/LoadingDots";

const ServiceSelect = ({ theme, onNext, handleCancel }) => {

    const gStyles = getGlobalStyles(theme);

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState();
    const [selectedService, setSelectedService] = useState('');
    useEffect(() => {
        setLoading(true);
        getDentalServices().then(setServices).catch(console.error)
        setLoading(false)

    }, [])

    const handleItemPress = (item) => {
        const isSelected = selectedItems.includes(item.id); // Assuming your items have a unique 'id'

        if (isSelected) {
            setSelectedItems(selectedItems.filter((id) => id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item.id]);
        }
    };

    const handleNext = () => {

        if (selectedItems) {
            onNext({ selectedItems });
        } else {
            alert('Please select a service.');
        }
    };


    const RenderItem = ({ item }) => {


        const isItemSelected = selectedItems ? (selectedItems.id === item.id) : false;

        // const isItemSelected = selectedItems.includes(item.id);

        return (
            <TouchableOpacity style={{

                // borderColor: isItemSelected ? theme.blue : theme.border, 
                padding: 8, marginBottom: 8,
                // borderBottomWidth: 1
            }} onPress={() => setSelectedItems(item)} >
                <View style={[gStyles.flexRow, { justifyContent: 'space-between', width: "100%" }]}>
                    <View style={{ marginEnd: 8 }}>

                        {isItemSelected ? <CheckCircleIcon color={theme.blue} size={36} /> : <CheckCircleIconOutline color={theme.gray} size={36} />}
                    </View>
                    <View style={{ flex: 3 }}>


                        <View style={{ marginBottom: 8 }}>
                            <Text style={{ fontFamily: theme.font700, fontSize: 16, color: theme.text, marginEnd: 8 }}>{item.name}</Text>

                            <Text style={{ fontFamily: theme.font500, fontSize: 14, color: theme.text }}>
                                {item.medical_name}
                            </Text>
                        </View>

                        {/* <Text style={{ fontFamily: theme.font700, fontSize: 14, marginBottom: 8 }}>Estimation : ${item.cost}</Text> */}
                        <Text style={{ textAlign: 'justify', color: theme.mutedText, fontFamily: theme.font400, fontSize: 13, }} numberOfLines={2}
                            ellipsizeMode="tail">{item.desc}</Text>
                    </View>



                </View>
            </TouchableOpacity>
        )
    }
    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, marginTop: 16 }}>
                    <Text style={gStyles.stepFormScreenTitle} >Choose Your Sparkling Service</Text>

                    {loading ?

                        <LoadingDots />

                        : <>
                            <View style={{ height: "100%" }}>
                                <FlatList

                                    ItemSeparatorComponent={() => (
                                        <View style={{ backgroundColor: theme.border, height: 2 }} />
                                    )}
                                    data={services}
                                    keyExtractor={(item) => item.id.toString()}
                                    showsVerticalScrollIndicator={false}

                                    renderItem={({ item }) => (
                                        <RenderItem item={item} />
                                    )}
                                    style={{ marginBottom: 80, backgroundColor: theme.cardBackground, padding: 8, borderRadius: 8 }}
                                />
                            </View>
                        </>
                    }

                </View>
            </View>



            <ButtonWrapper theme={theme} >
                <CancelButton theme={theme} handlePress={handleCancel} />


                <NextPrevButtonWrapper theme={theme}>

                    <NextButton theme={theme} handlePress={handleNext} />
                </NextPrevButtonWrapper>





            </ButtonWrapper >



        </>
    )
}

export default ServiceSelect;