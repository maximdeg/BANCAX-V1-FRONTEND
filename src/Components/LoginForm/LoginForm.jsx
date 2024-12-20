import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ENV from "../../env.js";
import { POST } from "../../fetching/http.fetching";
import { extractFormData } from "../../utils/extractFormData";
import { useAuthContext } from "../../Context/AuthContext.jsx";
import { validateFields } from "../../utils/validateFields.js";
import { getUnnauthenticatedHeaders } from "../../utils/Headers";
import LoadingDots from "../LoadingDots/LoadingDots";

const LoginForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { setIsAuthenticatedUser } = useAuthContext();
    const [outputMessages, setOutputMessages] = useState([]);

    const handleLoginForm = async (e) => {
        try {
            e.preventDefault();

            setIsLoading(true);

            const form_HTML = e.target;
            const form_values = new FormData(form_HTML);
            const form_fields = {
                email: "",
                password: "",
            };
            const form_values_object = extractFormData(form_fields, form_values);

            const errors = validateFields(form_values_object);

            if (errors.length > 0) {
                setOutputMessages(errors);
                setIsLoading(false);
                return;
            }

            // TODO: One of this form variables saves if the remember checkbox is checked, manage to save the session

            const response = await POST(`${ENV.API_URL}/api/v1/auth/login`, {
                headers: getUnnauthenticatedHeaders(),
                body: JSON.stringify(form_values_object),
            });

            if (!response.ok) {
                setOutputMessages(() => [{ message: response.payload.detail }]);
                setIsLoading(false);
                return;
            }

            const access_token = response.payload.token;

            localStorage.setItem("access_token", access_token);
            localStorage.setItem("user_info", JSON.stringify(response.payload.user));
            setIsAuthenticatedUser(true);
            setIsLoading(false);
            navigate("/");
        } catch (err) {
            if (err.message === "Failed to fetch") {
                setOutputMessages(() => [{ message: "Our server is down, please try again in a few minutes" }]);
                setIsLoading(false);
                console.dir(err);
            } else {
                setOutputMessages(() => [{ message: err.message }]);
                setIsLoading(false);
                console.dir(err);
                // TODO: SHOW ERROR MESSAGE HERE
            }
        }
    };
    return (
        <div className="login-container">
            <div className="logo-container">
                <Link to="/home">
                    <img src="https://res.cloudinary.com/djdnlogf1/image/upload/v1734110512/logo_njrhjq.png" alt="" />
                </Link>
            </div>
            <form action="" className="login-form" onSubmit={handleLoginForm}>
                <h2> Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className="remember-container">
                    <div>
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <Link to="/in/forgot-password" className="link link-forgot">
                        Forgot Password?
                    </Link>
                </div>
                <div className="btn-container">
                    {isLoading ? (
                        <button className="btn btn-signin">
                            <LoadingDots />
                        </button>
                    ) : (
                        <button className="btn btn-signin">Sign In</button>
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
                        New to Bancax?{" "}
                        <Link className="link link-signup" to={"/in/register"}>
                            Sign up!
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

export default LoginForm;
