import React from "react";
import { useForm } from "../../Hooks/useForm";

const EditPhotoWindow = ({ user, handleForm }) => {
    const form_fields = { photo: "" };
    const { handleChangeInputValue } = useForm(form_fields);

    const handleEdit = (e) => {
        e.preventDefault();
        handleForm(e, form_fields);
    };

    return (
        <div className="window edit-profile-window">
            <h3>Photo</h3>
            <div className="user-img">
                <img src={user.photo} alt="user" />
            </div>
            <form className="form-group-user" onSubmit={(e) => handleEdit(e)}>
                <div>
                    <input className="btn" type="file" name="photo" id="photo" onChange={handleChangeInputValue} />
                </div>
                <div className="btn-container">
                    <button className="btn btn-save-picture">Save</button>
                </div>
            </form>
        </div>
    );
};

export default EditPhotoWindow;
