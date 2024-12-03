import React, { useContext } from "react";

const GlobalContext = React.createContext();

const GlobalContextProvider = ({ children }) => {
    // TODO: Change all session storages for global context

    const setStorageUserInfo = (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    };

    const getStorageUserInfo = (key) => {
        return JSON.parse(sessionStorage.getItem(key));
    };

    const getSourcesAndCategoriesFromStorage = () => {
        const { sources, categories } = getStorageUserInfo("user_info");
        const activeSources = sources.filter((source) => source.is_active === true).reverse();
        const activeCategories = categories.filter((category) => category.is_active === true).reverse();
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
