import { FlatList } from "react-native";
import SafeAreaContainer from "../../components/SafeAreaContainer";
import useSpecialists from "../../hooks/useSpecialists";
import SpecialistItem from "./SpecialistItem";
import SearchBox from "../../components/SearchBox";
import { useMemo, useState } from "react";

export default function Specialist() {
    const { specialists, loading } = useSpecialists();
    const [query, setQuery] = useState('');

    const filteredSpecialists = useMemo(() => {
        if (!query) return specialists
        return specialists.filter(
            (s) =>
                s.name.toLowerCase().includes(query.toLowerCase())
        )
    }, [query, specialists])
    return (
        <SafeAreaContainer screenTitle="Specialists" loading={loading}
            allowedBack={true}>

            <SearchBox onSearch={setQuery} placeholder='Search Specialists' />
            <FlatList
                data={filteredSpecialists}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <SpecialistItem item={item} />}

            />
            {/* {specialists && specialists.length > 0 && specialists.map((item) => <SpecialistItem item={item} />)} */}


        </SafeAreaContainer>
    )
}