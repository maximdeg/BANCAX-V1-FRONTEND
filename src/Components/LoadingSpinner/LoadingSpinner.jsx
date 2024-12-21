import React from "react";
import { useLocation } from "react-router-dom";

const LoadingSpinner = () => {
    const { pathname } = useLocation();

    return (
        <div className={pathname === "/movements" ? "loading-page movements" : "loading-page"}>
            <div className="lds-ripple" bis_skin_checked="1">
                <div bis_skin_checked="1"></div>
                <div bis_skin_checked="1"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
