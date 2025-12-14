import { ScrollView, StyleSheet, Text } from "react-native";
import SecondOpinionWrapper from "./SecondOpinionWrapper";
import { useSecondOpinion } from "../../context/SecondOpinionContext";
import Card from "../../components/Card";
import InfoCard from "../../components/InfoCard";
import { useTheme } from "../../theme/ThemeProvider";


const InfoDescription = ({ description }) => {
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        desc: {
            fontFamily: theme.font500,
            fontSize: 16
        }
    });
    return (
        <>
            <Text style={styles.desc}>{description}</Text>
        </>
    )
}
export default function Summary() {
    const { theme } = useTheme();
    const { secondOpinion } = useSecondOpinion();

    return (
        <SecondOpinionWrapper screenTitle="Opinion Summary" >
            <ScrollView showsVerticalScrollIndicator={false}>

                <InfoCard title="Category">


                    <InfoDescription description={secondOpinion?.category?.name} />

                </InfoCard>

                <InfoCard title="Services" >
                    <InfoDescription description={secondOpinion?.services?.map((item) => <>
                        {item?.name}
                    </>)} />

                </InfoCard>

                <InfoCard title="Concern">
                    <InfoDescription description={secondOpinion?.description} />

                </InfoCard>

                <InfoCard title="Uploaded Documents">
                    {secondOpinion.documents ? secondOpinion?.documents.length > 0 &&
                        secondOpinion?.documents.map((document) => <InfoDescription description= {document.name} />
                           
                       )
                        : <InfoDescription description={'No documents attached'} /> 
                    }
                </InfoCard>


            </ScrollView>

        </SecondOpinionWrapper>
    )
}