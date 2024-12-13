import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

    return (
        <section className="verify-section">
            <p className="verify_section_subtitle">Welcome to</p>
            <div className="verify-container">
                <span>B</span>
                <span>N</span>
                <span>X</span>
            </div>
            <div className="btn-verify-container">
                <Link to="/in/login">
                    <button className="btn">Come back to Log In</button>
                </Link>
            </div>
        </section>
    );
};

export default VerificationConfirmation;
