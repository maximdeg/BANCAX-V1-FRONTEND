import React from "react";
import "./LoadingDots.css";

const LoadingDots = () => {
    return (
        <div className="lds-ellipsis" bis_skin_checked="1">
            <div bis_skin_checked="1"></div>
            <div bis_skin_checked="1"></div>
            <div bis_skin_checked="1"></div>
            <div bis_skin_checked="1"></div>
        </div>
    );
};

export default LoadingDots;
