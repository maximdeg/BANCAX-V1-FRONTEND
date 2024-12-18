import React, { useState } from "react";
import "./EditNameWindow.css";
import { useForm } from "../../Hooks/useForm";
import { extractFormData } from "../../utils/extractFormData";
import { useGlobalContext } from "../../Context/GlobalContext";
import LoadingDots from "../LoadingDots/LoadingDots";

const EditNameWindow = ({ user, handleForm, outputErrors, setOutputErrors, isLoading, setIsLoading }) => {
    const form_fields = { fullname: "", email: "" };
    const { handleChangeInputValue } = useForm(form_fields);

    const handleEdit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const form_HTML = e.target;
        const form_values = new FormData(form_HTML);

        const form_values_object = extractFormData(form_fields, form_values);
        const { fullname, email } = form_values_object;

        if (!fullname && !email) {
            setIsLoading(false);
            return setOutputErrors(() => [{ message: "*Please fill at least one field to save changes" }]);
        }

        if (!fullname) delete form_values_object.fullname;
        if (!email) delete form_values_object.email;

        handleForm(e, form_values_object);
    };

    return (
        <div className="window edit-profile-window">
            <h3>User information</h3>
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
                <div className="form-group ">
                    <label htmlFor="fullname">Full name</label>
                    <input type="fullname" name="fullname" id="fullname" placeholder={user.fullname} onChange={handleChangeInputValue} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder={user.email} onChange={handleChangeInputValue} />
                </div>
                <div className="btn-container">
                    {isLoading ? (
                        <button className="btn btn-save-profile">
                            <LoadingDots />
                        </button>
                    ) : (
                        <button className="btn btn-save-profile">Save</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EditNameWindow;
