import { useEffect, useState } from "react";
import api from "../services/api";


export default function useDentalCares({ categoryId = null }) {
    const [cares, setCares] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        setLoading(true);
        let apiUrl = '/dentalcare';
        if (categoryId) {
            apiUrl = '/categories/services?dental_service_id=' + categoryId;
        }

      
        api.get(apiUrl)
            .then((res) => {
                setCares(res.data?.dentalCares)
                setCategories(res.data?.categories)
            })

            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
    }, [categoryId]);

    return { cares, categories, loading, errors };
}