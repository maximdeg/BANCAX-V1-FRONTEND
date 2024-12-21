import React, { useMemo, useState, useRef } from "react";
import { GET } from "../fetching/http.fetching";
import { getAuthenticatedHeaders } from "../utils/Headers";
import { useGlobalContext } from "../Context/GlobalContext";
import ENV from "../env";

const useMovements = () => {
    const { getStorageUserInfo } = useGlobalContext();
    const { id } = getStorageUserInfo();
    const [isLoadingMovements, setIsLoadingMovements] = useState(true);
    const [movements, setMovements] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    const isInitialMountRef = useRef(true);

    const getMovements = async (id) => {
        try {
            const response = await GET(`${ENV.API_URL}/api/v1/transactions/${id}`, {
                headers: getAuthenticatedHeaders(),
            });

            if (response.ok) {
                setMovements(() => response.payload.transactions);
                setIsLoadingMovements(() => false);
            }
        } catch (err) {
            console.log(err.message);
            setIsLoadingMovements(false);
        }
    };

    const updateMovements = () => {
        if (isInitialMountRef.current) {
            getMovements(id);
            isInitialMountRef.current = false;
        }
    };

    useMemo(() => updateMovements(), [lastUpdated]);

    return { movements, isLoadingMovements };
};

export default useMovements;
