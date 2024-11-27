import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ENV from "../../env.js";
// import useStorage from "../../Hooks/useStorage";
import { POST } from "../../fetching/http.fetching";
import { getUnnauthenticatedHeaders } from "../../utils/Headers";
import { extractFormData } from "../../utils/extractFormData";

import "./LoginForm.css";
import { useAuthContext } from "../../Context/AuthContext.jsx";
const LoginForm = () => {
    const navigate = useNavigate();
    const { setIsAuthenticatedUser } = useAuthContext();

    const handleLoginForm = async (e) => {
        try {
            e.preventDefault();

            const form_HTML = e.target;
            const form_values = new FormData(form_HTML);
            const form_fields = {
                email: "",
                password: "",
            };
            const form_values_object = extractFormData(form_fields, form_values);

            // TODO: One of this form variables saves if the remember checkbox is checked, manage to save the session

            const response = await POST(`${ENV.API_URL}/api/v1/auth/login`, {
                headers: getUnnauthenticatedHeaders(),
                body: JSON.stringify(form_values_object),
            });

            const access_token = response.payload.token;

            // console.log(response.payload);
            sessionStorage.setItem("access_token", access_token);
            sessionStorage.setItem("user_info", JSON.stringify(response.payload.user));
            setIsAuthenticatedUser(true);
            navigate("/");
        } catch (err) {
            console.error(err.message);
            // TODO: SHOW ERROR MESSAGE HERE
        }
    };
    return (
        <div className="login-container">
            <h2> Login</h2>
            {/* <h3>Welcome back!</h3> */}
            <form action="" className="login-form" onSubmit={handleLoginForm}>
                <div className="form-group">
                    <label htmlFor="email">Login</label>
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
                    <button className="btn btn-signin">Sign In</button>
                </div>
            </form>
            <div className="link-container">
                <span>
                    New to Bancax?{" "}
                    <Link className="link link-signup" to={"/in/register"}>
                        Sign up!
                    </Link>
                </span>
            </div>
            <div className="copyright-container">
                <span>© Maxim Degtiarev 2024. Only for portfolio purposes.</span>
            </div>
        </div>
    );
};

export default LoginForm;
