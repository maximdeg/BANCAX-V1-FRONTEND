import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./ResetPasswordForm.css";
import { PUT } from "../../fetching/http.fetching";
import { getUnnauthenticatedHeaders } from "../../utils/Headers";
import { extractFormData } from "../../utils/extractFormData";
import ENV from "../../env";

const ResetPasswordForm = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const fetchURL = async (data) => {
        try {
            const response = await PUT(`${ENV.API_URL}/api/v1/auth/reset-password/${token}`, {
                headers: getUnnauthenticatedHeaders(),
                body: JSON.stringify({ data }),
            });

            return response;
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleSubmitResetPasswordForm = async (e) => {
        try {
            e.preventDefault();

            const form_HTML = e.target;
            const form_values = new FormData(form_HTML);
            const form_fields = {
                password: "",
                password_confirm: "",
            };
            const form_values_object = extractFormData(form_fields, form_values);

            await fetchURL(form_values_object);

            navigate("/in/login");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <Link to="/home">
                    <img src="https://res.cloudinary.com/djdnlogf1/image/upload/v1734110512/logo_njrhjq.png" alt="" />
                </Link>
            </div>
            <form onSubmit={handleSubmitResetPasswordForm} className="login-form">
                <h2> Password Reset </h2>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password" placeholder="********" />
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirm">Confirm Password</label>
                    <input type="password" name="password_confirm" id="password_confirm" placeholder="********" />
                </div>
                <div className="btn-container">
                    <button className="btn btn-signin">Confirm</button>
                </div>
                <div className="link-container">
                    <span>
                        Already have an account?{" "}
                        <Link className="link link-signup" to={"/register"}>
                            Log in!
                        </Link>
                    </span>
                </div>
            </form>
            <div className="copyright-container">
                <span>
                    ©{" "}
                    <Link to="https://github.com/maximdeg" className="link">
                        {" "}
                        Maxim Degtiarev{" "}
                    </Link>{" "}
                    2024. Only for portfolio purposes.
                </span>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
