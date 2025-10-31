import { useEffect, useState } from "react";
import api from "../services/api";


export default function useDentists() {
    const [dentists, setDentists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    useEffect(() => {

        setLoading(true);
        let apiUrl = '/dentists';


        api.get(apiUrl)
            .then((res) => setDentists(res?.data))
            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
    }, []);

    return { dentists, loading, errors };
}