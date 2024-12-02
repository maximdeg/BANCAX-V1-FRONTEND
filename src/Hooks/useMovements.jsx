import React, { useMemo, useState, useRef } from "react";
import { GET } from "../fetching/http.fetching";
import { getAuthenticatedHeaders } from "../utils/Headers";
import ENV from "../env";

const useMovements = () => {
    const { id } = JSON.parse(sessionStorage.getItem("user_info"));
    const [isLoadingMovements, setIsLoadingMovements] = useState(true);
    const [movements, setMovements] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    // const [error, setError] = useState(null);
    const isInitialMountRef = useRef(true);

    const getMovements = async (id) => {
        try {
            const response = await GET(`${ENV.API_URL}/api/v1/transactions/${id}`, {
                headers: getAuthenticatedHeaders(),
            });

            if (response.ok) {
                setMovements(() => response.payload.transactions);
                setLastUpdated(Date.now());
                setIsLoadingMovements(() => false);
                console.log("MOVEMENTS UPDATED");
            }
        } catch (err) {
            console.log(err.message);
            setIsLoadingMovements(false);
        }
    };

    const updateMovements = () => {
        if (isInitialMountRef.current) {
            console.log("UPDATING MOVEMENTS");
            getMovements(id);
            isInitialMountRef.current = false;
        }
    };

    useMemo(() => updateMovements(), [lastUpdated]);

    return { movements, isLoadingMovements };
};

export default useMovements;

// const useMovements = () => {
//   const { id } = JSON.parse(sessionStorage.getItem('user_info'));
//   const [movements, setMovements] = useState([]);
//   const [isLoadingMovements, setIsLoadingMovements] = useState(true);
//   const isInitialMountRef = useRef(true);

//   const fetchMovements = async () => {
//     try {
//       const response = await GET(`${ENV.API_URL}/api/v1/transactions/${id}`, {
//         headers: getAuthenticatedHeaders(),
//       });

//       if (response.ok) {
//         setMovements(response.payload.transactions);
//         setIsLoadingMovements(false);
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   useEffect(() => {
//     if (isInitialMountRef.current) {
//       isInitialMountRef.current = false;
//       fetchMovements();
//     }
//   }, []);

//   // You might want to add a dependency array to the useEffect hook to
//   // re-fetch data when certain conditions change, such as a new movement
//   // being added or updated. This could involve using a custom hook or
//   // a state variable to track changes.

//   return { movements, isLoadingMovements };
// };

// export default useMovements;
