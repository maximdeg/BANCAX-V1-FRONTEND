import React, { useEffect, useState } from "react";
import { GET } from "../fetching/http.fetching";
import { getAuthenticatedHeaders } from "../utils/Headers";
import ENV from "../env";

const useMovements = () => {
    const { id } = JSON.parse(sessionStorage.getItem("user_info"));

    const [movements, setMovements] = useState([]);
    const [isLoadingMovements, setIsLoadingMovements] = useState(true);

    const getMovements = async (id) => {
        try {
            const response = await GET(`${ENV.API_URL}/api/v1/transactions/${id}`, {
                headers: getAuthenticatedHeaders(),
            });

            if (response.ok) {
                setMovements(response.payload.transactions);
                setIsLoadingMovements(false);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getMovements(id);
    }, []);

    return { movements, isLoadingMovements };
};

export default useMovements;
