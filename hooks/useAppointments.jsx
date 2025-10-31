import { useEffect, useState } from "react";
import api from "../services/api";


export default function useAppointments({ patientId }) {
    const [openBookings, setOpenBookings] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        setLoading(true);
        let apiUrl = '/my-appointments?patient_id=' + patientId;
      

      
        api.get(apiUrl)
            .then((res) => {
             
                setOpenBookings(res.data?.open)
                setPendingBookings(res.data?.pending)
              })

            .catch((err) => setErrors(err))
            .finally(() => setLoading(false));
           
    }, [patientId]);

    return { openBookings, pendingBookings, loading, errors };
}