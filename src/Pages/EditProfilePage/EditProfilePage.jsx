import React, { useEffect, useState } from "react";
import ENV from "../../env";
import { PUT } from "../../fetching/http.fetching";
import { getAuthenticatedHeaders } from "../../utils/Headers";
import EditNameWindow from "../../Components/EditNameWindow/EditNameWindow";
import EditPhotoWindow from "../../Components/EditPhotoWindow/EditPhotoWindow";
import EditPasswordWindow from "../../Components/EditPasswordWindow/EditPasswordWindow";

import "./EditProfilePage.css";
import { useGlobalContext } from "../../Context/GlobalContext";
import { validateFields } from "../../utils/validateFields";

const EditProfilePage = () => {
    const { getStorageUserInfo, setStorageUserInfo } = useGlobalContext();
    const [outputErrors, setOutputErrors] = useState([]);
    const user = getStorageUserInfo();

    const handleForm = async (e, values) => {
        try {
            setOutputErrors(() => validateFields(values));

            if (outputErrors.length !== 0) return;

            for (const value in values) {
                user[value] = values[value];
            }

            const response = await PUT(`${ENV.API_URL}/api/v1/users/${user.id}`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(user),
            });

            if (response.status !== 200) {
                setOutputErrors(() => [response.payload.detail]);
                return;
            }

            const new_user_data = response.payload.detail.user;
            console.log(new_user_data);
            setOutputErrors(() => [{ message: "Profile updated succesfully", color: "green" }]);

            setStorageUserInfo("user_info", new_user_data);
        } catch (err) {
            setOutputErrors(() => [{ message: err.message }]);
            console.log(err.message);
        }
    };

    return (
        <div className="edit-profile-page">
            <h2>Edit profile</h2>
            <div className="containers">
                <EditNameWindow user={user} handleForm={handleForm} outputErrors={outputErrors} setOutputErrors={setOutputErrors} />
                <EditPasswordWindow user={user} handleForm={handleForm} outputErrors={outputErrors} setOutputErrors={setOutputErrors} />
                <EditPhotoWindow user={user} handleForm={handleForm} outputErrors={outputErrors} setOutputErrors={setOutputErrors} />
            </div>
        </div>
    );
};

export default EditProfilePage;
