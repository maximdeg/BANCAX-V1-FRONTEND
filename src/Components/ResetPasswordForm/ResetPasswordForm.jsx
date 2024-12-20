import React from "react";
import ENV from "../../env";
import { PUT } from "../../fetching/http.fetching";
import { extractFormData } from "../../utils/extractFormData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUnnauthenticatedHeaders } from "../../utils/Headers";

import "./ResetPasswordForm.css";
import { validateFields } from "../../utils/validateFields";

const ResetPasswordForm = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState();
    const [outputMessages, setOutputMessages] = useState();

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

            if (form_values_object.password !== form_values_object.password_confirm) {
                setOutputMessages([{ message: "Passwords do not match." }]);
                isLoading(false);
                return;
            }

            const errors = validateFields(form_values_object);

            if (errors.length > 0) {
                setOutputMessages(errors);
                isLoading(false);
                return;
            }

            const response = await fetchURL(res, form_values_object);

            if (!response.ok) {
                setOutputMessages({ message: response.payload.detail });
                isLoading(false);
                return;
            }

            navigate("/in/login");
        } catch (err) {
            setOutputMessages({ message: err.message });
            isLoading(false);
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
                    {isLoading ? (
                        <button className="btn btn-signin">
                            <LoadingDots />
                        </button>
                    ) : (
                        <button className="btn btn-signin">Confirm</button>
                    )}
                </div>
                {outputMessages.length !== 0 && (
                    <div className="output-messages-container">
                        {outputMessages.map((message, index) => {
                            return (
                                <div className="output-message" key={index} style={{ color: message.color || "red" }}>
                                    {message.message}
                                </div>
                            );
                        })}
                    </div>
                )}
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
