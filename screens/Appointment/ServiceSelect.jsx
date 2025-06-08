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
        console.log(selectedItems);
        if (selectedItems) {
            onNext({ selectedItems });
        } else {
            alert('Please select a service.');
        }
    };


    const RenderItem = ({ item }) => {

        
            const isItemSelected = selectedItems ? (selectedItems.id  === item.id) : false;

        // const isItemSelected = selectedItems.includes(item.id);

        return (
            <TouchableOpacity style={{
                borderStyle: 'solid', borderRadius: 5,
                borderColor: isItemSelected ? theme.blue : theme.border, borderWidth: 1, padding: 8, marginBottom: 12
            }} onPress={() => setSelectedItems(item)} >
                <View style={[gStyles.flexRow, { justifyContent: 'space-between' }]}>
                    <View style={gStyles.flexRow}>

                        {isItemSelected ? <CheckCircleIcon color={theme.blue} style={{ marginEnd: 12 }} /> : <CheckCircleIconOutline color={theme.gray} style={{ marginEnd: 12 }} />}


                        <Text style={{ fontFamily: theme.font600 }}>{item.name}</Text>

                    </View>

                    <Text style={{ fontFamily: theme.font400 }}>$ {item.cost}</Text>
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
                        <>
                            <ActivityIndicator size={"large"} />
                        </>
                        : <>
                            <View style={{ height: "100%" }}>
                                <FlatList
                                    data={services}
                                    keyExtractor={(item) => item.id.toString()}
                                    showsVerticalScrollIndicator={false}

                                    renderItem={({ item }) => (
                                        <RenderItem item={item} />
                                    )}
                                    style={{ marginBottom: 64 }}
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