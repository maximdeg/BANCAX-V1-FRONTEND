import React from "react";
import { useForm } from "../../Hooks/useForm";
import LoadingDots from "../LoadingDots/LoadingDots";
import { PUT } from "../../fetching/http.fetching";
import { getAuthenticatedHeaders } from "../../utils/Headers";
import ENV from "../../env";
import { useGlobalContext } from "../../Context/GlobalContext";
import "./EditPhotoWindow.css";

const EditPhotoWindow = ({ user, outputErrors, setOutputErrors, isLoading, setIsLoading }) => {
    const { setStorageUserInfo } = useGlobalContext();
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
            setImageBase64((prevImage) => file_reader.result);
        };

        if (file_found) {
            file_reader.readAsDataURL(file_found);
        }

        setIsLoading(false);
    };

    const handleForm = async (e) => {
        try {
            const response = await PUT(`${ENV.API_URL}/api/v1/users/upload-photo/${user.id}`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify({ photo: imageBase64 }),
            });

            if (response.status !== 200) {
                setOutputErrors(() => [response.payload.detail]);
                setIsLoading(false);
                return;
            }

            const new_user_data = response.payload.detail.user;

            setOutputErrors(() => [{ message: "Profile updated succesfully", color: "green" }]);
            setStorageUserInfo("user_info", new_user_data);
            setIsLoading(false);
        } catch (err) {
            setOutputErrors(() => [{ message: err.message }]);
            setIsLoading(false);
            if (err.message === "Failed to fetch") {
                return setOutputErrors(() => [{ message: "Server is not working well at the moment. Please try again later." }]);
            }
        }
    };
    const handleEdit = (e) => {
        e.preventDefault();
        handleForm(e);
        // FIXME: FORM_FIELDS IS NOT DEFINED
    };

    return (
        <div className="window edit-profile-window">
            <h3>Photo</h3>
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
            <div className="user-img">
                <img src={imageBase64} alt="user" />
            </div>
            <form className="form-group-user" onSubmit={(e) => handleEdit(e)}>
                <div>
                    <input
                        className="btn btn-choose-file"
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
