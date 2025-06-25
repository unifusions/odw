import { useContext, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import getGlobalStyles from "../../theme/globalStyles";
import { ThemeContext } from "../../theme/ThemeProvider";
import FloatingLabelInput from "../../components/FloatingLabelInput";
import SelectInput from "../../components/SelectInput";
import SafeAreaContainerKeyboardAvoiding from "../../components/SafeAreaContainerKeyboardAvoiding";
import Card from "../../components/Card";
import RadioInput from "../../components/RadioInput";
 
import FloatingDatePicker from "../../components/FloatingDatePicker";
import { useNavigation } from "@react-navigation/native";

const AddInsurance = () => {

    const { theme } = useContext(ThemeContext);
    const styles = getGlobalStyles(theme);
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        relation: '',
        dob: new Date(),
        address_line_1: "",
        address_line_2: "",
        address_line_3: "",
        state_id: '',
        city_id: '',
        zip_code_id: '',
        mode: "",
        insurance_provider: '',
        carrier: "",
        plan_no: "",
        status: "",
        is_current: 1,

    });

    const nextStep = (data, screenTitle) => {
        setFormData({ ...formData, ...data });
        setCurrentStep(currentStep + 1);

        console.log(formData);
    };

    return (
        <>
            <SafeAreaContainerKeyboardAvoiding screenTitle="Add Insurance" allowedBack={true}>


                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 16 }}>
                    <Card title="Subscriber Details">


                        <FloatingLabelInput
                            label="Subscriber First Name"
                            textChange={(text) => setFormData({ ...formData, first_name: text })}
                            value={formData.first_name}
                        />

                        <FloatingLabelInput
                            label="Subscriber Last Name"
                            textChange={(text) => setFormData({ ...formData, last_name: text })}
                            value={formData.last_name}
                        />
                        <FloatingDatePicker
                            label="Date of Birth"
                            textChange={(text) => setFormData({ ...formData, dob: text })}
                            value={formData.dob}
                        />
                      

                        <RadioInput
                            label="Relation with Subscriber"
                            options={[

                                { id: '1', name: 'Self' },
                                { id: '2', name: 'Spouse' },
                                { id: '3', name: 'Parent' },
                                { id: '4', name: 'Child' },

                            ]}
                            handleSelect={(item) => setFormData({ ...formData, relation: item })}
                            selectedOption={formData.relation}
                        />




                    </Card>

                    <Card title="Address">
                        <FloatingLabelInput
                            label="Address Line 1"
                            textChange={(text) => setFormData({ ...formData, address_line_1: text })}
                            value={formData.address_line_1}
                        />


                        <FloatingLabelInput
                            label="Address Line 2"
                            textChange={(text) => setFormData({ ...formData, address_line_2: text })}
                            value={formData.address_line_2}
                        />

                        <FloatingLabelInput
                            label="Address Line 3"
                            textChange={(text) => setFormData({ ...formData, address_line_3: text })}
                            value={formData.address_line_3}
                        />

                        <FloatingLabelInput
                            label="City"
                            textChange={(text) => setFormData({ ...formData, city_id: text })}
                            value={formData.city_id}
                        />

                        <FloatingLabelInput
                            label="State"
                            textChange={(text) => setFormData({ ...formData, state_id: text })}
                            value={formData.state_id}
                        />

                        <FloatingLabelInput
                            label="Zip Code"
                            textChange={(text) => setFormData({ ...formData, zip_code_id: text })}
                            value={formData.zip_code_id}
                        />
                    </Card>


                    <Card title="Insurance Details">
                        <FloatingLabelInput
                            label="Member ID"
                            textChange={(text) => setFormData({ ...formData, member_id: text })}
                            value={formData.member_id}
                        />

                        {/* <FloatingLabelInput
                            label=""
                            textChange={(text) => setFormData({ ...formData, mode: text })}
                            value={formData.mode}
                        /> */}


                        <RadioInput
                            label="How Did you get insurance"
                            options={[

                                { id: '1', name: 'Self' },
                                { id: '2', name: 'Employer' },
                                { id: '3', name: 'Medic Aid' },
                                { id: '4', name: 'Open enrollment' },

                            ]}

                            handleSelect={(item) => setFormData({ ...formData, mode: item })}
                            selectedOption={formData.mode}
                        />


                        <FloatingLabelInput
                            label="Insurance Provider"
                            textChange={(text) => setFormData({ ...formData, insurance_provider: text })}
                            value={formData.insurance_provider}
                        />

                        <FloatingLabelInput
                            label="Group / Plan Number"
                            textChange={(text) => setFormData({ ...formData, plan_no: text })}
                            value={formData.plan_no}
                        />
                    </Card>













                    <View>
                        <TouchableOpacity style={styles.cta} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>Add Insurance</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>




            </SafeAreaContainerKeyboardAvoiding>

        </>
    )
}

export default AddInsurance;