import { ScrollView, Text } from "react-native";
import SecondOpinionWrapper from "./SecondOpinionWrapper";
import { useSecondOpinion } from "../../context/SecondOpinionContext";
import Card from "../../components/Card";
import InfoCard from "../../components/InfoCard";
import { useTheme } from "../../theme/ThemeProvider";

export default function Summary() {
    const { theme } = useTheme();
    const { secondOpinion } = useSecondOpinion();

    return (
        <SecondOpinionWrapper screenTitle="Opinion Summary" >
            <ScrollView showsVerticalScrollIndicator={false}>

                <InfoCard title="Category">
                    <Text>{secondOpinion?.category?.name}</Text>
                    <Text>{secondOpinion?.category?.image_path_url}</Text>


                </InfoCard>

                <InfoCard title="Services" >
                    <Text style={{ fontFamily: theme.font400, fontSize: 16 }}> {secondOpinion?.services?.map((item) => <>
                        {item?.name}
                    </>)}</Text>
                </InfoCard>

                <InfoCard title="Concern">
                    <Text>{secondOpinion?.description}</Text>
                </InfoCard>

                <InfoCard title="Uploaded Documents">
                    {secondOpinion.documents ? secondOpinion?.documents.length > 0 &&
                        secondOpinion?.documents.map((document) => <Text>
                            {document.name}
                        </Text>)
                        : <Text>No documents attached</Text>
                    }
                </InfoCard>


            </ScrollView>

        </SecondOpinionWrapper>
    )
}