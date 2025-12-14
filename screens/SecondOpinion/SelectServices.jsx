import { FlatList, Text, View } from "react-native";
import SecondOpinionWrapper from "./SecondOpinionWrapper";
import { useSecondOpinion } from "../../context/SecondOpinionContext";
import useDentalCares from "../../hooks/useDentalCares";
import ServicesList from "../../components/ServicesList";
import { useEffect, useState } from "react";
import Snackbar from "../../components/Snackbar";

export default function SelectServices() {

    const { secondOpinion, updateSecondOpinion } = useSecondOpinion();
    const { cares, loading, errors } = useDentalCares({ categoryId: secondOpinion?.category?.id });
    const [selectedItems, setSelectedItems] = useState();
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {

        if (secondOpinion?.services?.length > 0) {
            setSnackbarMessage(`${secondOpinion.services.length} service${secondOpinion.services.length === 1 ? '' : 's'} selected`);
            setSnackbarVisible(true);
        }

        // setSnackbarMessage(`${secondOpinion?.services?.length} service${secondOpinion?.services?.length === 1 ? '' : 's'} selected`);
        // // setSnackbarVisible(true);
    }, [secondOpinion.services])

    return (
        <>
            <SecondOpinionWrapper screenTitle="Select Services"
                loading={loading}>


               {!loading &&  <ServicesList
                    services={cares}
                    selectedIds={secondOpinion?.services}
                    onSelect={(newSelection) => {
                        updateSecondOpinion({ services: newSelection })

                    }}
                />
}
               
            </SecondOpinionWrapper>
            <Snackbar
                visible={snackbarVisible}
                message={snackbarMessage}
                onDismiss={() => setSnackbarVisible(false)}
                duration={2000}
            />
        </>


    )
}