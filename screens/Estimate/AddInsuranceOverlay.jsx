import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import LoadingDots from '../../components/LoadingDots';
import { getInsurance } from '../../services/insurance';
import { AuthContext, useAuth } from '../../context/AuthContext';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { ThemeContext, useTheme } from '../../theme/ThemeProvider';
import Badge from '../../components/Badge';
import useInsurance from '../../hooks/useInsurance';
import Card from '../../components/Card';


const InsuranceCard = ({ insurance, handlePress }) => {
    const { theme } = useTheme();
    const DetailedLine = ({ label, value }) => {
        return (
            <View style={{ justifyContent: "space-between", flexDirection: "row", marginVertical: 2 }}>
                <Text style={{ fontFamily: theme.font500, letterSpacing: 0.5 }}>{label}</Text>
                <Text style={{ fontFamily: theme.font600, letterSpacing: 0.5 }}>{value}</Text>

            </View>
        )
    }
    return (

        <Card title={insurance.insurance_provider}>
            <TouchableOpacity style={{ paddingVertical: 5 }} onPress={handlePress}>



                <View>
                    <Text style={{ fontFamily: theme.font600, fontSize: 18, marginBottom: 8 }}>{insurance.insurance_provider}</Text>

                </View>


                <DetailedLine label="Member ID" value={insurance.member_id} />
                <DetailedLine label="Relation" value={insurance.mode} />




            </TouchableOpacity>
        </Card>
    )
}

const AddInsuranceOverlay = ({ visibility, requestClose, onSelect }) => {

    const { user, patient } = useAuth();
    const { theme } = useContext(ThemeContext);
    const [processing, setProcessing] = useState(true);



    const { insurances, loading, errors } = useInsurance({ patientId: patient?.id });


    return (

        <Modal
            transparent
            animationType="slide"
            visible={visibility}
            onRequestClose={requestClose}
        >
            <TouchableWithoutFeedback  onPress={requestClose}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', }}>Select Insurance


                            </Text>
                            <TouchableOpacity onPress={requestClose}>
                                <XCircleIcon color={theme.danger} />

                            </TouchableOpacity>
                        </View>



                        <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
                            {loading ? <LoadingDots /> :

                                insurances.length > 0 ?
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        style={{ flex: 1 }}
                                        data={insurances}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({ item }) => (



                                            <InsuranceCard key={item.id} insurance={item} handlePress={() => onSelect(item)} />



                                        )}
                                    />
                                    :
                                    <Text>No insurance found. Add your Insurace in My Profile section</Text>

                            }
                            {/* Your insurance selection UI here */}

                        </View>



                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    );
};

const styles = StyleSheet.create({
    insuranceButton: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        alignItems: 'center'
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end', // Bottom sheet effect
        backgroundColor: 'rgba(0,0,0,0.3)', // dim background
    },
    modalContent: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: '80%', // partial screen
    },
});

export default AddInsuranceOverlay;
