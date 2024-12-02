import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ENV from "../../env";
import { getUnnauthenticatedHeaders } from "../../utils/Headers";
import { GET } from "../../fetching/http.fetching";
import "./VerificationConfirmationPage.css";

const VerificationConfirmation = () => {
    const { verification_token } = useParams();

    const verify = async () => {
        try {
            const response = await GET(`${ENV.API_URL}/api/v1/auth/verify/${verification_token}`, {
                headers: getUnnauthenticatedHeaders(),
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        verify();
    }, []);

    return <div>VERIFICATION CONFIRMATION PAGE</div>;
};

export default VerificationConfirmation;
