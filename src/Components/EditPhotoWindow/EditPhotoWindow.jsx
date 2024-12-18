import React from "react";
import { useForm } from "../../Hooks/useForm";
import LoadingDots from "../LoadingDots/LoadingDots";

const EditPhotoWindow = ({ user, handleForm, outputErrors, setOutputErrors, isLoading, setIsLoading }) => {
    const [imageBase64, setImageBase64] = React.useState(user.photo);

    const handleChangePhoto = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const file_found = e.target.files[0];

        if (file_found && file_found.size > 5 * 1024 * 1024) {
            setOutputErrors({ message: "File too big, max 5MB" });
            setIsLoading(false);
            return;
        }

        const file_reader = new FileReader();
        file_reader.onloadend = () => {
            setImageBase64(file_reader.result);
        };

        if (file_found) {
            file_reader.readAsDataURL(file_found);
        }

        setIsLoading(false);
    };
    const handleEdit = (e) => {
        e.preventDefault();
        handleForm(e, form_fields);
        // FIXME: FORM_FIELDS IS NOT DEFINED
    };

    return (
        <div className="window edit-profile-window">
            <h3>Photo</h3>
            <div className="user-img">
                <img src={imageBase64} alt="user" />
            </div>
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
                <div>
                    <input
                        className="btn"
                        type="file"
                        name="image_base_64"
                        id="photo"
                        placeholder="Enter your password"
                        onChange={handleChangePhoto}
                    />
                </div>
                <div className="btn-container">
                    {isLoading ? (
                        <button className="btn btn-save-picture">
                            <LoadingDots />
                        </button>
                    ) : (
                        <button className="btn btn-save-picture">Save</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EditPhotoWindow;
