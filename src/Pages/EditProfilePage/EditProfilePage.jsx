import React, { useState } from "react";
import ENV from "../../env";
import { PUT } from "../../fetching/http.fetching";
import { getAuthenticatedHeaders } from "../../utils/Headers";
import { useGlobalContext } from "../../Context/GlobalContext";
import EditNameWindow from "../../Components/EditNameWindow/EditNameWindow";
import EditPhotoWindow from "../../Components/EditPhotoWindow/EditPhotoWindow";
import EditPasswordWindow from "../../Components/EditPasswordWindow/EditPasswordWindow";

// import "./EditProfilePage.css";

const EditProfilePage = () => {
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
            </div>
        </div>
    );
};

export default EditProfilePage;
