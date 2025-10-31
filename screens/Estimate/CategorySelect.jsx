import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "../../theme/ThemeProvider";
import { getAllDentalServices, getDentalServices } from "../../services/dentalServices";
import getGlobalStyles from "../../theme/globalStyles";
import { CheckCircleIcon as CheckCircleIconOutline } from "react-native-heroicons/outline";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import Badge from "../../components/Badge";
import ButtonWrapper from "../Appointment/ButtonWrapper";
import CancelButton from "../Appointment/CancelButton";
import NextPrevButtonWrapper from "../Appointment/NextPrevButtonWrapper";
import NextButton from "../Appointment/NextButton";
import SafeAreaContainerStepForm from "../../components/SafeAreaContainerStepForm";
import LoadingDots from "../../components/LoadingDots";

export default function CategorySelect({ title, onNext, handleCancel, currentStep }) {

    const { theme } = useContext(ThemeContext);

    const [services, setServices] = useState([]);
    const [selectedItems, setSelectedItems] = useState();
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(false);

    const styles = StyleSheet.create({

    });
    const gStyles = getGlobalStyles(theme);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const data = await getAllDentalServices();
                setServices(data);
            } catch (err) {
                Alert.alert("Error", "Something went wrong please try again sometime");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();

    }, [])

    const handleItemPress = (item) => {
        const isSelected = category.includes(item.id); // Assuming your items have a unique 'id'

        if (isSelected) {
            setCategory(category.filter((id) => id !== item.id));
        } else {
            setCategory([...category, item.id]);
        }
    };

    const handleNext = () => {

        if (category) {
            onNext({ category });
        } else {
            alert('Please select a service.');
        }
    };
    const RenderItem = ({ item }) => {


        const isItemSelected = category ? (category.id === item.id) : false;

        return (
            <TouchableOpacity style={{

                padding: 8, marginBottom: 8,
            }} onPress={() => setCategory(item)} >
                <View style={[gStyles.flexRow, { justifyContent: 'space-between', width: "100%" }]}>
                    <View style={{ marginEnd: 8 }}>
                        <Text>   {isItemSelected ? <CheckCircleIcon color={theme.blue} size={36} /> : <CheckCircleIconOutline color={theme.gray} size={36} />}</Text>

                    </View>
                    <View style={{ flex: 3 }}>


                        <View style={{ flexDirection: "row", marginBottom: 8, alignItems: "center" }}>
                            <Text style={{ fontFamily: theme.font700, fontSize: 16, color: theme.text, marginEnd: 8 }}>{item.name}</Text>
                            {/* <Badge badgeText={item.medical_name} size={true} /> */}

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
            <SafeAreaContainerStepForm screenTitle={title}
                allowedBack={true}
                step={currentStep}
                stepCount={4}
            >

                <View style={{ flex: 1 }}>
                    {loading ?
                        <>
                            <View style={{ alignContent: "center", alignItems: "center", flex: 1, justifyContent: "center" }}>
                                <LoadingDots />
                            </View>
                        </>
                        : <>

                            <View style={{ flex: 1, marginTop: 16 }}>
                                <Text style={gStyles.stepFormScreenTitle} >Choose any one of our Sparkling Service</Text>
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
                            </View>

                        </>
                    }
                </View>

                <ButtonWrapper theme={theme} >
                    <CancelButton theme={theme} handlePress={handleCancel} />


                    <NextPrevButtonWrapper theme={theme}>

                        <NextButton theme={theme} handlePress={handleNext} label="Next"/>
                    </NextPrevButtonWrapper>





                </ButtonWrapper >

            </SafeAreaContainerStepForm>

        </>
    )
}