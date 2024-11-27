import React from "react";
import "./ForgotPasswordForm.css";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
    return (
        <div className="login-container">
            <h2> Password Reset Request</h2>
            {/* <h3>Welcome back!</h3> */}
            <form action="" className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
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

export default ForgotPasswordForm;
