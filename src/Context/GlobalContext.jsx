import React, { createContext, useContext, useMemo, useState } from "react";
import { PUT } from "../fetching/http.fetching";
import { extractFormData } from "../utils/extractFormData.js";
import { getAuthenticatedHeaders } from "../utils/Headers.js";
import ENV from "../env.js";

const GlobalContext = React.createContext();

const GlobalContextProvider = ({ children }) => {
    // TODO: Change all session storages for global context

    const handleAddForm = async (e, property) => {
        try {
            e.preventDefault();

            const form_HTML = e.target;
            const form_values = new FormData(form_HTML);
            const form_fields = {
                name: "",
                color: "",
            };
            const form_values_object = extractFormData(form_fields, form_values);

            const user = JSON.parse(sessionStorage.getItem("user_info"));

            user[property].push(form_values_object);

            const response = await PUT(`${ENV.API_URL}/api/v1/users/${user.id}`, {
                headers: getAuthenticatedHeaders(),
                body: JSON.stringify(user),
            });

            sessionStorage.setItem("user_info", JSON.stringify(user));

            console.log(response.payload.detail);
        } catch (err) {
            console.log(err.message);
        }
    };

    return <GlobalContext.Provider value={{ handleAddForm }}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export { GlobalContextProvider, useGlobalContext };
