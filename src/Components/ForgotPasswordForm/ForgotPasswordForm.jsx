import React, { useState } from "react";
import ENV from "../../env.js";
import LoadingDots from "../LoadingDots/LoadingDots.jsx";
import { Link } from "react-router-dom";
import { PUT } from "../../fetching/http.fetching";
import { getUnnauthenticatedHeaders } from "../../utils/Headers";
import "./ForgotPasswordForm.css";
import { validateFields } from "../../utils/validateFields.js";

const ForgotPasswordForm = () => {
    const [outputMessages, setOutputMessages] = useState([]);
    const [emailAmount, setEmailAmount] = useState(0);
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    const setOutputState = (message) => {
        setOutputMessages(() => message);
        setIsSendingEmail(() => false);
    };

    const handleSubmitEmail = async (e) => {
        try {
            e.preventDefault();

            setIsSendingEmail(() => true);

            const email = e.target.email.value;
            const errors = validateFields({ email });

            if (!email) {
                return setOutputState([{ message: "Please enter an email address" }]);
            }
            if (errors.length > 0) {
                setOutputState(errors);
                return;
            }

            if (emailAmount !== 0) {
                setOutputState([
                    {
                        color: "white",
                        message:
                            "We have already sent an email to this address: " +
                            email +
                            ". Please wait 1 hour before requesting another recovery password email.",
                    },
                ]);
                return;
            }

            const response = await PUT(`${ENV.API_URL}/api/v1/auth/forgot-password`, {
                headers: getUnnauthenticatedHeaders(),
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                setOutputState([{ message: response.payload.detail }]);
                return;
            }

            setOutputState([{ color: "white", message: "Email sent successfully to " + email + ". Please also check your spam folder." }]);

            setEmailAmount((currentAmount) => {
                return currentAmount + 1;
            });
        } catch (err) {
            setOutputState([{ message: err.message }]);
            if (err.message === "Failed to fetch") {
                return setOutputState([{ message: "Server is not working well at the moment. Please try again later." }]);
            }
        }
    };
    return (
        <div className="login-container">
            {/* <h3>Welcome back!</h3> */}
            <div className="logo-container">
                <Link to="/home">
                    <img src="https://res.cloudinary.com/djdnlogf1/image/upload/v1734110512/logo_njrhjq.png" alt="" />
                </Link>
            </div>
            <div className="send-email-description">
                <p>Enter your email and a link will be sent to your email to reset your password.</p>
                <span>
                    If you don't have an account please
                    <Link className="link link-signup" to="/in/register">
                        {" "}
                        Sign Up
                    </Link>
                </span>
            </div>
            <form className="login-form" onSubmit={(e) => handleSubmitEmail(e)}>
                <h2> Password Reset Request</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="btn-container">
                    {!isSendingEmail ? (
                        <button className="btn btn-signin">Send email</button>
                    ) : (
                        <div className="btn btn-loading">
                            <LoadingDots />
                        </div>
                    )}
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

export default ForgotPasswordForm;
