import React from "react";
import "./ForgotPasswordForm.css";
import { Link } from "react-router-dom";
import ENV from "../../env.js";
import { getUnnauthenticatedHeaders } from "../../utils/Headers";
import { POST } from "../../fetching/http.fetching";

const ForgotPasswordForm = () => {
    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        console.log(email);

        const response = await POST(`${ENV.API_URL}/api/v1/auth/forgot-password`, {
            headers: getUnnauthenticatedHeaders(),
            body: JSON.stringify({ email }),
        });

        console.log(response);
    };
    return (
        <div className="login-container">
            <h2> Password Reset Request</h2>
            {/* <h3>Welcome back!</h3> */}
            <div>
                <p>Enter your email and we will send you a link to your email to reset your password.</p>
                <span>
                    If you don't have an account please
                    <Link className="link link-signup" to="/in/register">
                        {" "}
                        Sign Up
                    </Link>
                </span>
            </div>
            <form className="login-form" onSubmit={(e) => handleSubmitEmail(e)}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="btn-container">
                    <button className="btn btn-signin">Send email</button>
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

export default ForgotPasswordForm;
