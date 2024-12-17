import React, { useState } from "react";
import { AddCategoryWindow, AddSourceWindow, ColorsConfigWindow } from "../../Components";

import "./SettingsPage.css";
import { extractFormData } from "../../utils/extractFormData";
import { PUT } from "../../fetching/http.fetching";
import ENV from "../../env";
import { getAuthenticatedHeaders } from "../../utils/Headers";
import { useGlobalContext } from "../../Context/GlobalContext";

const SettingsPage = () => {
    const { getSourcesAndCategoriesFromStorage, setStorageUserInfo, getStorageUserInfo } = useGlobalContext();
    const { activeSources, activeCategories } = getSourcesAndCategoriesFromStorage();
    const [sourcesListState, setSourcesListState] = useState(activeSources);
    const [categoriesListState, setCategoriesListState] = useState(activeCategories);
    const [isLoading, setIsLoading] = useState(false);

    const setStates = (user, property) => {
        if (property === "sources") {
            setSourcesListState(user[property]);
        } else if (property === "categories") {
            setCategoriesListState(user[property]);
        }
    };

    const handleAddForm = async (e, property) => {
        try {
            e.preventDefault();

            setIsLoading(true);

            const form_HTML = e.target;
            const form_values = new FormData(form_HTML);
            const form_fields = {
                name: "",
                color: "",
            };
            const form_values_object = extractFormData(form_fields, form_values);

            const user = getStorageUserInfo();

            user[property].push(form_values_object);

            const response = await PUT(`${ENV.API_URL}/api/v1/users/${user.id}`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                setIsLoading(false);
                return;
            }

            setIsLoading(false);

            const new_user_data = response.payload.detail.user;

            setStorageUserInfo("user_info", new_user_data);

            setStates(new_user_data, property);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleDeleteItem = async (e, property, id) => {
        try {
            e.preventDefault();

            const user = getStorageUserInfo();

            user[property].forEach((item) => {
                if (item._id === id) {
                    item.is_active = false;
                }
                return item;
            });

            const response = await PUT(`${ENV.API_URL}/api/v1/users/${user.id}`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(user),
            });

            const new_user_data = response.payload.detail.user;

            setStorageUserInfo("user_info", new_user_data);

            setStates(new_user_data, property);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="settings-page">
            <AddSourceWindow
                title="Source"
                arrayPluralName="sources"
                handleDeleteItem={handleDeleteItem}
                handleAddForm={handleAddForm}
                list={sourcesListState}
                isLoading={isLoading}
            />
            <AddSourceWindow
                title="Category"
                arrayPluralName="categories"
                handleDeleteItem={handleDeleteItem}
                handleAddForm={handleAddForm}
                list={categoriesListState}
                isLoading={isLoading}
            />
            {/* <ColorsConfigWindow /> */}
        </div>
    );
};

export default SettingsPage;
