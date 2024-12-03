import React from "react";
import MovementsWindow from "../../Components/MovementsWindow/MovementsWindow";
import TotalBalanceWindow from "../../Components/TotalBalanceWindow/TotalBalanceWindow";

import "./MovementsPage.css";
const MovementsPage = () => {
    return (
        <div className="movements-page">
            <TotalBalanceWindow />
            <MovementsWindow />
        </div>
    );
};

export default MovementsPage;
