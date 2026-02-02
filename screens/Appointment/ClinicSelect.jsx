import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { ClinicLocationServices } from "../../services/ClinicLocationServices";
import ButtonWrapper from "./ButtonWrapper";
import CancelButton from "./CancelButton";
import NextPrevButtonWrapper from "./NextPrevButtonWrapper";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";
import LoadingDots from "../../components/LoadingDots";

const ClinicSelect = ({ theme, gStyles, onNext, handleCancel, prevStep }) => {

    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClinic, setSelectedClinic] = useState();

    useEffect(() => {

        const fetchClinics = async () => {
            try {
                const res = await ClinicLocationServices();
                if (Array.isArray(res)) {
                    setClinics(res);
                } else {

                    setClinics([]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchClinics();


    }, [])

    const handleNext = () => {
        if (selectedClinic) {
            onNext({ selectedClinic });
        } else {
            alert('Please select a nearby clinic.');
        }
    };



    const RenderItem = ({ item }) => {
        const isSelected = selectedClinic ? (selectedClinic.id === item.id) : false;
        return (
            <TouchableOpacity style={{
                backgroundColor: theme.white,
                borderStyle: 'solid', borderRadius: 5, borderWidth: 1, padding: 8, marginBottom: 12,
                borderColor: isSelected ? theme.blue : theme.border
            }} onPress={() => setSelectedClinic(item)}>

                <View>
                    <Image source={{ uri: item.logo_url }} />
                </View>
              
                <Text style={{ fontFamily: theme.font600, color: theme.dark, marginBottom: 4 }}>{item.name}</Text>
                <Text style={{ fontSize: 12, fontFamily: theme.font400, color: theme.gray }}>
                    {item.address_line_1}{"\n"}{item.address_line_2}</Text>

            </TouchableOpacity>
        )
    }
    return (
        <>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, marginTop: 16 }}>
                    <Text style={gStyles.stepFormScreenTitle} >Pick Your Smile Spot</Text>

                    {loading ? <LoadingDots /> :
                        <>   <FlatList
                            data={clinics}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => <RenderItem item={item} />
                            }
                        /></>
                    }
                </View>
            </View>
            <ButtonWrapper theme={theme} >
                <CancelButton theme={theme} handlePress={handleCancel} />


                <NextPrevButtonWrapper theme={theme}>
                    <PreviousButton theme={theme} handlePress={prevStep} />

                    <NextButton theme={theme} handlePress={handleNext} />
                </NextPrevButtonWrapper>





            </ButtonWrapper >
        </>

    )
}

export default ClinicSelect;