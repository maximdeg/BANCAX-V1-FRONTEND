import React, { useState } from "react";
import ENV from "../../env.js";
import { useForm } from "../../Hooks/useForm";
import { POST } from "../../fetching/http.fetching";
import { Link, useNavigate } from "react-router-dom";
import { validateFields } from "../../utils/validateFields";
import { extractFormData } from "../../utils/extractFormData";
import { getUnnauthenticatedHeaders } from "../../utils/Headers";

import "./RegistrationForm.css";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [outputMessages, setOutputMessages] = useState([]);
    const form_fields = {
        fullname: "",
        email: "",
        password: "",
        password_confirm: "",
    };

    const { handleChangeInputValue } = useForm(form_fields);

    const handleSubmitRegisterForm = async (e) => {
        try {
            e.preventDefault();
            const form_HTML = e.target;
            const form_values = new FormData(form_HTML);
            const form_values_object = extractFormData(form_fields, form_values);

            const errors = validateFields(form_values_object);

            if (errors.length > 0) {
                setOutputMessages(errors);
                console.log("SIGN UP FORM", errors);
                return;
            }

            if (form_values_object.password !== form_values_object.password_confirm) {
                setOutputMessages((prevMessages) => [...prevMessages, { message: "Passwords do not match" }]);
                return;
            }

            const response = await POST(`${ENV.API_URL}/api/v1/auth/signup`, {
                headers: getUnnauthenticatedHeaders(),
                body: JSON.stringify(form_values_object),
            });

            if (!response.ok) {
                setOutputMessages((prevMessages) => [{ message: response.payload.message }]);
                return;
            }

            setOutputMessages((prevMessages) => [{ color: "green", message: "Please open the verification link sent to your email." }]);
        } catch (err) {
            setOutputMessages((prevMessages) => [{ message: err.message }]);
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
            <form action="" className="registration-form" onSubmit={handleSubmitRegisterForm}>
                <h2>Sign up</h2>
                <div className="form-group">
                    <label htmlFor="fullname">Full name*</label>
                    <input type="fullname" name="fullname" id="fullname" placeholder="John Doe" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input type="email" name="email" id="email" placeholder="example@email.com" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password*</label>
                    <input type="password" name="password" id="password" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirm">Confirm Password*</label>
                    <input type="password" name="password_confirm" id="password_confirm" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="btn-container">
                    <button className="btn btn-signup">Send verification email</button>
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
            </form>
            <div className="link-container">
                <span>
                    Already have an account?{" "}
                    <Link className="link link-signup" to={"/in/login"}>
                        Log in!
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

export default RegistrationForm;
