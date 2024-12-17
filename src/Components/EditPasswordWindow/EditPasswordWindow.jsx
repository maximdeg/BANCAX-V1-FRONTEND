import React from "react";

import "./EditPasswordWindow.css";
import { useForm } from "../../Hooks/useForm";

const EditPasswordWindow = ({ user, handleForm, outputErrors, setOutputErrors }) => {
    const form_fields = { "current-password": "", "new-password": "", password_confirm: "" };
    const { handleChangeInputValue } = useForm(form_fields);

    const handleEdit = (e) => {
        e.preventDefault();

        handleForm(e, form_fields);
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
                    <label htmlFor="current-password">Current password</label>
                    <input type="password" name="current-password" id="current-password" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="new-password">New password</label>
                    <input type="password" name="new-password" id="new-password" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="password_confirm">Confirm new password</label>
                    <input type="password" name="password_confirm" id="password_confirm" placeholder="********" onChange={handleChangeInputValue} />
                </div>
                <div className="btn-container">
                    <button className="btn btn-save-password">Save</button>
                </div>
            </form>
        </div>
    );
};

export default EditPasswordWindow;
