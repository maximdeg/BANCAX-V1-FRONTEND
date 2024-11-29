import React from "react";
import EditNameWindow from "../../Components/EditNameWindow/EditNameWindow";
import EditPhotoWindow from "../../Components/EditPhotoWindow/EditPhotoWindow";
import EditPasswordWindow from "../../Components/EditPasswordWindow/EditPasswordWindow";

import "./EditProfilePage.css";

const EditProfilePage = () => {
    const getUserInfo = async () => {
        const response = await GET(`${ENV.API_URL}/api/v1/transactions/${id}`, {
            headers: getAuthenticatedHeaders(),
        });
        return response;
    };

    return (
        <div className="edit-profile-page">
            <h2>Edit profile</h2>
            <div className="containers">
                <EditNameWindow />
                <EditPhotoWindow />
                <EditPasswordWindow />
            </div>
        </div>
    );
};

export default EditProfilePage;
