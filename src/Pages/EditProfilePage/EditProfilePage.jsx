import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ENV from "../../env";
import { confirmAlert } from "react-confirm-alert";
import "./react-confirm-alert.css";
import { DELETE, PUT } from "../../fetching/http.fetching";
import { getAuthenticatedHeaders } from "../../utils/Headers";
import { useGlobalContext } from "../../Context/GlobalContext";
import EditNameWindow from "../../Components/EditNameWindow/EditNameWindow";
import EditPhotoWindow from "../../Components/EditPhotoWindow/EditPhotoWindow";
import DeleteUserWindow from "../../Components/DeleteUserWindow/DeleteUserWindow";
import EditPasswordWindow from "../../Components/EditPasswordWindow/EditPasswordWindow";

const EditProfilePage = () => {
    const navigate = useNavigate();
    const { getStorageUserInfo, setStorageUserInfo } = useGlobalContext();
    const [outputErrors, setOutputErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const user = getStorageUserInfo();

    const handleForm = async (e, values) => {
        try {
            for (const value in values) {
                user[value] = values[value];
            }

            const response = await PUT(`${ENV.API_URL}/api/v1/users/${user.id}`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(user),
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
                return setOutputErrors([{ message: "Server is not working well at the moment. Please try again later." }]);
            }
        }
    };

    const handleDeleteUser = (e) => {
        e.preventDefault();

        confirmAlert({
            title: "Delete account",
            message: "Are you sure you want to delete your account? This action is irreversible.",
            buttons: [
                {
                    label: "Cancel",
                },
                {
                    label: "DELETE",
                    onClick: async () => {
                        try {
                            const response = await DELETE(`${ENV.API_URL}/api/v1/users/${user.id}`, {
                                headers: getAuthenticatedHeaders(),
                            });

                            if (!response.ok) {
                                confirmAlert({
                                    title: "Error",
                                    message: `Sorry, this error affected the delete account action: \n ${response.payload.detail}`,
                                    buttons: [
                                        {
                                            label: "Ok",
                                        },
                                    ],
                                });
                                return;
                            }

                            confirmAlert({
                                title: "Successfully deleted account",
                                message:
                                    "We are sorry to see you go 😢. Your account has been successfully deleted.\n We will take you to our home page.",
                                buttons: [
                                    {
                                        label: "Ok",
                                        onClick: () => {
                                            navigate("/home");
                                        },
                                    },
                                ],
                            });
                        } catch (err) {
                            confirmAlert({
                                title: "Error",
                                message: `Sorry, this error affected the delete account action: \n ${err.message}`,
                                buttons: [
                                    {
                                        label: "Ok",
                                    },
                                ],
                            });
                        }
                    },
                },
            ],
        });
    };

    return (
        <div className="edit-profile-page">
            <h2>Edit profile</h2>
            <div className="containers">
                <EditNameWindow
                    user={user}
                    handleForm={handleForm}
                    outputErrors={outputErrors}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setOutputErrors={setOutputErrors}
                />
                <EditPasswordWindow user={user} isLoading={isLoading} setIsLoading={setIsLoading} />
                <EditPhotoWindow
                    user={user}
                    handleForm={handleForm}
                    outputErrors={outputErrors}
                    isLoading={isLoading}
                    setOutputErrors={setOutputErrors}
                    setIsLoading={setIsLoading}
                />
                <DeleteUserWindow handleDeleteUser={handleDeleteUser} />
            </div>
        </div>
    );
};

export default EditProfilePage;
