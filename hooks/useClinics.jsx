import { useEffect, useState } from "react";
import api from "../services/api";


export default function useClinics() {
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        setLoading(true);
        let url = "/clinics";
        
        api.get(url)
            .then((res) => setClinics(res.data))
            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
    }, []);

    return { clinics, loading, errors };
}