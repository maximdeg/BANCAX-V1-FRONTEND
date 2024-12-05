import React from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticatedUser } = useAuthContext();
    return <div>{isAuthenticatedUser ? <Outlet /> : <Navigate to={"/home"} />}</div>;
};

export default ProtectedRoute;
