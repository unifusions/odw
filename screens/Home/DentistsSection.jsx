import { Text, View } from "react-native";
import useDentists from "../../hooks/useDentists";
import DentistItem from "./DentistItem";
import SectionHeader from "../../components/SectionHeader";
import DentistItemSkeleton from "../../components/home/skeleton/DentistItemSkeleton";

export default function DentistsSection() {

    const { dentists, loading, errors } = useDentists();

    if (loading) {
        return (<DentistItemSkeleton />)
    }
    return (
        <View style={{ marginBottom: 16 }}>
            <SectionHeader
                sectionTitle="Top Dentists"
                touchableText="See All"

            />

            {dentists && dentists.length > 0 && dentists.map((item) => <DentistItem key={item?.id} item={item} />)}

        </View>
    )
}