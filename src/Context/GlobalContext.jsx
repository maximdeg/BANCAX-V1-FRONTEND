import React, { useContext } from "react";
import useMovements from "../Hooks/useMovements";

const GlobalContext = React.createContext();

const GlobalContextProvider = ({ children }) => {
    // TODO: Change all session storages for global context

    const setStorageUserInfo = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const getStorageUserInfo = () => {
        return JSON.parse(localStorage.getItem("user_info"));
    };

    const getSourcesAndCategoriesFromStorage = () => {
        const { sources, categories } = getStorageUserInfo();
        const activeSources = sources.filter((source) => source.is_active === true);
        const activeCategories = categories.filter((category) => category.is_active === true);
        return { activeSources, activeCategories };
    };

    return (
        <GlobalContext.Provider value={{ setStorageUserInfo, getStorageUserInfo, getSourcesAndCategoriesFromStorage }}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export { GlobalContextProvider, useGlobalContext };
