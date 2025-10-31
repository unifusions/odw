import { useEffect, useState } from "react";
import api from "../services/api";


export default function useSettings() {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);


    useEffect(() => {

        setLoading(true);
        let apiUrl = '/app-settings';

        api.get(apiUrl)
            .then((res) => setSettings(res?.data))
            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
    }, []);

    return { settings, loading, errors };
}