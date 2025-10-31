import { useEffect, useState } from "react";
import api from "../services/api";


export default function useInsurance({ patientId }) {
    const [insurances, setInsurances] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        setLoading(true);
let apiUrl = '/insurance?patient_id=' + patientId;

        api.get(apiUrl)
            .then((res) => setInsurances(res?.data?.insurances))
            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
    }, []);

    return { insurances, loading, errors };
}