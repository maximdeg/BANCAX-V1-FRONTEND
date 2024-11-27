import React from "react";

const LoadingSpinner = () => {
    return (
        <div className="loading-page">
            <div className="lds-ripple" bis_skin_checked="1">
                <div bis_skin_checked="1"></div>
                <div bis_skin_checked="1"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
