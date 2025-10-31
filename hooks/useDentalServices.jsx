import { useEffect, useState } from "react";
import api from "../services/api";


export default function useDentalServices({ featured = false }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        setLoading(true);
        let url = "/all-dental-services";
        if (featured) {
            url = "/dental-services"
        }
        api.get(url)
            .then((res) => setServices(res.data))
            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
    }, []);

    return { services, loading, errors };
}