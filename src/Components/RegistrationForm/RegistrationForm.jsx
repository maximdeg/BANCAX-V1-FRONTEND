import React from "react";
import ENV from "../../env.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { extractFormData } from "../../utils/extractFormData";
import { POST } from "../../fetching/http.fetching";
import { getUnnauthenticatedHeaders } from "../../utils/Headers";

import "./RegistrationForm.css";

const RegistrationForm = () => {
    const navigate = useNavigate();
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

            const response = await POST(`${ENV.API_URL}/api/v1/auth/signup`, {
                headers: getUnnauthenticatedHeaders(),
                body: JSON.stringify(form_values_object),
            });

            console.log(response);

            if (!response.ok) {
                // TODO: SHOW ERROR MESSAGE
                // Use set error
            }

            navigate("/in/login");
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <div className="login-container">
            <h2> Sign up</h2>
            {/* <h3>Welcome back!</h3> */}
            <form action="" className="registration-form" onSubmit={handleSubmitRegisterForm}>
                <div className="form-group">
                    <label htmlFor="fullname">Full name</label>
                    <input type="fullname" name="fullname" id="fullname" placeholder="John Doe" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="example@email.com" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirm">Confirm Password</label>
                    <input type="password" name="password_confirm" id="password_confirm" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="btn-container">
                    <button className="btn btn-signup">Sign Up</button>
                </div>
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
                <span>© Maxim Degtiarev 2024. Only for portfolio purposes.</span>
            </div>
        </div>
    );
};

export default RegistrationForm;
