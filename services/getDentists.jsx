import api from "./api";

export const getDentists = async () => {
    try {
        const response = await api.get('/dentists');
        return response.data;
    }
    catch (error) {
        console.error('Error fetching ', error)
        throw error;
    }
}

export const getDentistsByBranch = async ({ branchId }) => {
    try {
        const response = await api.get('/dentists-by-branch',
            {
                params: {

                    clinic_branch_id: branchId
                }
            })

        return response.data;
    }
    catch (error) {
        throw error;
    }
}


export const getDentistsByClinic = async ({ clinicId }) => {
    try {
        const response = await api.get('/dentists-by-clinic',
            {
                params: {

                    clinic_id: clinicId
                }
            })

        return response.data;
    }
    catch (error) {
        throw error;
    }
}
