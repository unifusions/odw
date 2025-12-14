import { useCallback, useEffect, useState } from "react";
import api from "../services/api";


export default function useEstimates({ patientId }) {
    const [estimates, setEstimates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const fetchData = useCallback(() => {
        setLoading(true);

        let apiUrl = '/my-estimates?patient_id=' + patientId;


        api.get(apiUrl)
            .then((res) => setEstimates(res?.data))
            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
    }, [patientId])
    useEffect(() => {
        if (patientId) fetchData();
    }, []);

    return { estimates, loading, errors,  refetch: fetchData };
}