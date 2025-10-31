import { useEffect, useState } from "react";
import api from "../services/api";


export default function useDeals() {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    useEffect(() => {

        setLoading(true);
        let apiUrl = '/deals';


        api.get(apiUrl)
            .then((res) => setDeals(res?.data))
            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
    }, []);

    return { deals, loading, errors };
}