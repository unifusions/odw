import { Text, View } from "react-native";
import SafeAreaContainerStepForm from "../../components/SafeAreaContainerStepForm";
import InfoCard from "../../components/InfoCard";
import Cta from "../../components/Cta";
import LoadingDots from "../../components/LoadingDots";
import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeProvider";

export default function OpinionSummary({ formData, currentStep, handlePress }) {

    const { theme } = useContext(ThemeContext);
    return (
        <SafeAreaContainerStepForm
            screenTitle='Second Opinion Summary'
            allowedBack={true}
            step={currentStep}
            stepCount={4}
        >
            <InfoCard title="Category">
                <Text style={{ fontFamily: theme.font400, fontSize: 16 }}>

                    {formData?.category?.name}


                </Text>

            </InfoCard>

            <InfoCard title="Services" >
                <Text style={{ fontFamily: theme.font400, fontSize: 16 }}> {formData?.selectedItems?.map((item) => <>
                    {item?.name}
                </>)}</Text>
            </InfoCard>

            <InfoCard title="Additional Information" >
                <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: theme.border, marginBottom: 10, paddingBottom: 10 }}>
                    <Text
                        style={{ fontFamily: theme.font400, fontSize: 16 }}
                    >Last Visit</Text>
                    <Text style={{ fontFamily: theme.font400, fontSize: 16 }}>{formData?.description?.otherData?.last_visit?.name}</Text>
                </View>

                <View>
                    <Text style={{ fontFamily: theme.font400, fontSize: 16 }}>Described Concern</Text>
                    <Text style={{ fontFamily: theme.font400, fontSize: 16 }}>
                        {formData?.description?.userRequest}
                    </Text>
                </View>

            </InfoCard>

            <InfoCard title="Uploaded Documents">
                {formData?.description?.documents ? formData?.description?.documents.length > 0 &&
                    formData?.description?.documents.map((document) => <Text>
                        {document.name}
                    </Text>)
                    : <Text>No documents attachd</Text>
                }
            </InfoCard>
            <Cta title="Get Second Opinion" handlePress={handlePress} />

        </SafeAreaContainerStepForm>
    )
}