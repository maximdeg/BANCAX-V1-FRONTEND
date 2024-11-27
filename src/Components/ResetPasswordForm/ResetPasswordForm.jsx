import React from "react";
import { Link } from "react-router-dom";

import "./ResetPasswordForm.css";

const ResetPasswordForm = () => {
    return (
        <div className="login-container">
            <h2> Password Reset Puto</h2>
            {/* <h3>Welcome back!</h3> */}
            <form action="" className="login-form">
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="********" />
                </div>
                <div className="form-group">
                    <label htmlFor="password-confirm">Confirm Password</label>
                    <input type="password" name="password-confirm" id="password-confirm" placeholder="********" />
                </div>
                <div className="btn-container">
                    <button className="btn btn-signup">Confirm</button>
                </div>
            </form>
            <div className="link-container">
                <span>
                    Already have an account?{" "}
                    <Link className="link link-signup" to={"/register"}>
                        Log in!
                    </Link>
                </span>
            </div>
            <div className="copyright-container">
                <span>© Maxim Degtiarev 2024. Only for portfolio purposes.</span>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
