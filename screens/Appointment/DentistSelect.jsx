import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getDentistsByBranch } from "../../services/getDentists";
import DentistItem from "./DentistItem";
import ButtonWrapper from "./ButtonWrapper";
import CancelButton from "./CancelButton";
import PreviousButton from "./PreviousButton";
import NextButton from "./NextButton";
import NextPrevButtonWrapper from "./NextPrevButtonWrapper";




const DentistSelect = ({ theme, clinic, gStyles, onNext, handleCancel, prevStep }) => {

    const [dentists, setDentists] = useState([]);
    const [selectedDentist, setSelectedDentist] = useState();
    useEffect(() => {

        getDentistsByBranch({ branchId: clinic.branches[0].id }).then(
            setDentists).catch(console.error);
    }, [])


    const handleNext = () => {
        if (selectedDentist) {
            onNext({ selectedDentist });
        } else {
            alert('Please select your dental hero.');
        }
    };


    return (
        <>
            <View style={{ flex: 1, marginTop: 16 }}>
                <Text style={gStyles.stepFormScreenTitle}>Meet Your Tooth Hero</Text>
                {console.log(dentists)}
                <ScrollView>
                    {
                        dentists.length > 0 &&
                        dentists.map((item) => <DentistItem key={item.id} dentist={item} handleSelect={() => setSelectedDentist(item)} isSelected = {selectedDentist ? (selectedDentist.id === item.id) : false}/>)
                    }

                </ScrollView>
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

export default DentistSelect;