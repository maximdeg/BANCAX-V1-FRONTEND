import React, { useState } from "react";

import "./EditPasswordWindow.css";
import { useForm } from "../../Hooks/useForm";
import { extractFormData } from "../../utils/extractFormData";
import { POST, PUT } from "../../fetching/http.fetching";
import ENV from "../../env";
import { getAuthenticatedHeaders, getUnnauthenticatedHeaders } from "../../utils/Headers";
import { validateFields } from "../../utils/validateFields";
import LoadingDots from "../LoadingDots/LoadingDots";

const EditPasswordWindow = ({ user, isLoading, setIsLoading }) => {
    const form_fields = { current_password: "", new_password: "", password_confirm: "" };
    const { handleChangeInputValue } = useForm(form_fields);
    const [outputErrors, setOutputErrors] = useState([]);

    const setMessageAndLoadingOff = (message) => {
        setOutputErrors(() => [{ message }]);
        setIsLoading(false);
    };

    const checkCurrentPassword = async (current_password) => {
        try {
            const response = await POST(`${ENV.API_URL}/api/v1/auth/login`, {
                headers: getUnnauthenticatedHeaders(),
                body: JSON.stringify({ email: user.email, password: current_password }),
            });

            if (!response.ok) {
                setMessageAndLoadingOff(response.payload.detail || "Server is not working well at the moment. Please try again later.");
                return false;
            }

            return true;
        } catch (err) {
            setMessageAndLoadingOff(err.message);
            if (err.message === "Failed to fetch") {
                return setMessageAndLoadingOff("Server is not working well at the moment. Please try again later.");
            }
        }
    };

    const handleEdit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const form_HTML = e.target;
            const form_values = new FormData(form_HTML);
            const form_values_object = extractFormData(form_fields, form_values);
            const { current_password, new_password, password_confirm } = form_values_object;

            if (new_password !== password_confirm) {
                return setMessageAndLoadingOff("Passwords do not match");
            }

            const isCurrentPasswordValid = await checkCurrentPassword(current_password);

            if (!isCurrentPasswordValid) {
                return setMessageAndLoadingOff("Current password is incorrect.");
            }

            setOutputErrors(() => validateFields({ new_password }));

            if (outputErrors.length !== 0) {
                return setIsLoading(false);
            }

            const response = await PUT(`${ENV.API_URL}/api/v1/auth/reset-password/user/${user.id}`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify({ password: new_password, password_confirm: password_confirm }),
            });

            if (!response.ok) {
                return setMessageAndLoadingOff(response.payload.details || "Server is not working well at the moment. Please try again later.");
            }

            setOutputErrors(() => [{ message: "Password changed successfully", color: "green" }]);
            setIsLoading(false);
        } catch (err) {
            console.dir(err);
            return setMessageAndLoadingOff(err.message);
        }
    };

    return (
        <div className="window edit-profile-window">
            <h3>Change password</h3>
            <form className="form-group-user" onSubmit={(e) => handleEdit(e)}>
                {outputErrors.length !== 0 && (
                    <div className="output-messages-container">
                        {outputErrors.map((message, index) => {
                            return (
                                <div className="output-message" key={index} style={{ color: message.color || "red" }}>
                                    {message.message}
                                </div>
                            );
                        })}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="current_password">Current password</label>
                    <input type="password" name="current_password" id="current_password" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="new_password">New password</label>
                    <input type="password" name="new_password" id="new_password" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirm">Confirm new password</label>
                    <input type="password" name="password_confirm" id="password_confirm" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="btn-container">
                    {isLoading ? (
                        <button className="btn btn-save-password">
                            <LoadingDots />
                        </button>
                    ) : (
                        <button className="btn btn-save-password">Save</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EditPasswordWindow;
