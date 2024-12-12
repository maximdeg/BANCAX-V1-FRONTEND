import React, { useState } from "react";
import ENV from "../../env.js";
import LoadingDots from "../LoadingDots/LoadingDots.jsx";
import { Link } from "react-router-dom";
import { PUT } from "../../fetching/http.fetching";
import { getUnnauthenticatedHeaders } from "../../utils/Headers";
import "./ForgotPasswordForm.css";

const ForgotPasswordForm = () => {
    const [outputMessage, setOutputMessage] = useState("");
    const [emailAmount, setEmailAmount] = useState(0);
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    const setOutputState = (message) => {
        setOutputMessage(message);
        setIsSendingEmail(() => {
            return false;
        });
    };

    const handleSubmitEmail = async (e) => {
        try {
            e.preventDefault();

            setIsSendingEmail(() => {
                return true;
            });

            const email = e.target.email.value;

            console.log("FRONTEND:", email);

            if (!email) {
                return setOutputState("Please enter your email.");
            }

            if (emailAmount !== 0) {
                return setOutputState(
                    "We have already sent an email to this address: " +
                        email +
                        ". Please wait 1 hour before requesting another recovery password email."
                );
            }

            const response = await PUT(`${ENV.API_URL}/api/v1/auth/forgot-password`, {
                headers: getUnnauthenticatedHeaders(),
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setOutputState("Email sent successfully to " + email + ". Please also check your spam folder.");
                return setEmailAmount((currentAmount) => {
                    return currentAmount + 1;
                });
            } else {
                setOutputState("The email is not correct. Please try again or sign up with us.");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="login-container">
            {/* <h3>Welcome back!</h3> */}
            <div className="logo-container">
                <Link to="/home">
                    <img src="/img/logo.png" alt="" />
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
                    {outputMessage && (
                        <div className="email-sent">
                            <p>{outputMessage}</p>
                        </div>
                    )}
                    {!isSendingEmail ? (
                        <button className="btn btn-signin">Send email</button>
                    ) : (
                        <div className="btn btn-loading">
                            <LoadingDots />
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
