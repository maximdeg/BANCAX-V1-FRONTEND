import { useContext, createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const access_token = localStorage.getItem("access_token");
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(Boolean(access_token));

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        setIsAuthenticatedUser(access_token ? true : false);
    }, []);

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_info");
        setIsAuthenticatedUser(false);
    };

    return <AuthContext.Provider value={{ isAuthenticatedUser, logout, setIsAuthenticatedUser }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
