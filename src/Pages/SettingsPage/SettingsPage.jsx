import React from "react";
import { AddCategoryWindow, AddSourceWindow, ColorsConfigWindow } from "../../Components";

import "./SettingsPage.css";

const SettingsPage = () => {
    return (
        <div className="settings-page">
            <AddSourceWindow />
            <AddCategoryWindow />
            <ColorsConfigWindow />
        </div>
    );
};

export default SettingsPage;
