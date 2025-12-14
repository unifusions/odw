import { useCallback, useEffect, useState } from "react";
import api from "../services/api";


export default function useSecondOpinion({ patientId }) {
    const [secondopinions, setSecondopinions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);


    const fetchData = useCallback(() => {
        setLoading(true);
        setErrors(null);

        const apiUrl = '/second-opinions?patient_id=' + patientId;

        api.get(apiUrl)
            .then((res) => setSecondopinions(res?.data))
            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
    }, [patientId]);


    useEffect(() => {

        if (patientId) fetchData();
    }, []);

    return { secondopinions, loading, errors, refetch: fetchData };
}