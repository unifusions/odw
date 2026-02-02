import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { ThemeContext } from '../../theme/ThemeProvider';
import SearchBox from '../../components/SearchBox';
import Snackbar from '../../components/Snackbar';
import ButtonWrapper from '../Appointment/ButtonWrapper';
import CancelButton from '../Appointment/CancelButton';
import NextPrevButtonWrapper from '../Appointment/NextPrevButtonWrapper';
import NextButton from '../Appointment/NextButton';
import SafeAreaContainerStepForm from '../../components/SafeAreaContainerStepForm';
import PreviousButton from '../Appointment/PreviousButton';
import { getDentalCareByTreatment } from '../../services/getDentalCare';
import LoadingDots from '../../components/LoadingDots';
import useDentalCares from '../../hooks/useDentalCares';
import ServicesList from '../../components/ServicesList';
import LoadingDotsWithOverlay from '../../components/LoadingDotsWithOverlay';


export default function CareSelect({ onNext, handleCancel, title, currentStep, prevStep, treatment }) {

    const { theme } = useContext(ThemeContext);

    const [processing, setProcessing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedItems, setSelectedItems] = useState([]);

    const [originalData, setOriginalData] = useState([]);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const { cares, loading, errors } = useDentalCares({ categoryId: treatment });




    const handleNext = () => {

        if (selectedItems.length > 0) {
            // const selectedObjects = cares.filter(item => selectedItems.includes(item.id));

            const selectedObjects = cares.filter(item =>
  selectedItems.some(selected => selected.id === item.id)
);

            onNext({ selectedItems: selectedObjects });
        }
        else {
            alert('Please select atleast one treatment.');

        }
    }



    return (
        <>

            <SafeAreaContainerStepForm
                screenTitle={title}
                step={currentStep}
                allowedBack={true}
                stepCount={4}

            >
                {loading ?
                    <LoadingDotsWithOverlay />
                    :
                    <>

                        <View style={{ flex: 1 }}>
 
                            <View style={{ flex: 1, marginTop: 16 }}>

                                {loading ? <ActivityIndicator size="large" /> :

                                    <>
                                        <ServicesList
                                            services={cares}
                                            selectedIds={selectedItems}
                                            onSelect={setSelectedItems}

                                        />
                                    </>

                                    //    <FlatList
                                    //         data={filteredData}
                                    //         renderItem={renderItem}
                                    //         keyExtractor={(item) => item.id}
                                    //         extraData={selectedItems} // Ensures re-render on selection change
                                    //     />
                                }


                            </View>
                        </View>

                        <ButtonWrapper theme={theme} >

                            <CancelButton theme={theme} handlePress={handleCancel} />


                            <NextPrevButtonWrapper theme={theme}>
                                <PreviousButton theme={theme} handlePress={prevStep} />
                                <NextButton theme={theme} handlePress={handleNext} label="Next" />
                            </NextPrevButtonWrapper>





                        </ButtonWrapper >
                        <Snackbar
                            visible={snackbarVisible}
                            message={snackbarMessage}
                            onDismiss={() => setSnackbarVisible(false)}
                            duration={2000}
                        />
                    </>



                }



            </SafeAreaContainerStepForm>
        </>

    );
}

const styles = StyleSheet.create({
    // ... define your styles here
});