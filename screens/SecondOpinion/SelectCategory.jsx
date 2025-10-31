import { Text, View } from "react-native";
import SecondOpinionWrapper from "./SecondOpinionWrapper";
import CategoryList from "../../components/CategoryList";
import { useSecondOpinion } from "../../context/SecondOpinionContext";
import useDentalServices from "../../hooks/useDentalServices";
import LoadingDotsWithOverlay from "../../components/LoadingDotsWithOverlay";

export default function SelectCategory() {

    const { secondOpinion, updateSecondOpinion } = useSecondOpinion();
    const { services, loading, errors } = useDentalServices();

    return (
        <SecondOpinionWrapper screenTitle="Select Category" heading="Choose any one of our Sparkling Service"
            loading={loading}>

            <CategoryList
                categories={services}
                selectedId={secondOpinion?.category?.id}
                onSelect={(item) => updateSecondOpinion({ category: item })}
            />
          
        </SecondOpinionWrapper>

    )
}