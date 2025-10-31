import { useEffect, useState } from "react";
import api from "../services/api";


export default function useSpecialists() {
    const [specialists, setSpecialists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    useEffect(() => {

        setLoading(true);
        let apiUrl = '/specialists';


        api.get(apiUrl)
            .then((res) => setSpecialists(res?.data))
            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
    }, []);

    return { specialists, loading, errors };
}