import React from "react";
import MovementsWindow from "../../Components/MovementsWindow/MovementsWindow";
import TotalBalanceWindow from "../../Components/TotalBalanceWindow/TotalBalanceWindow";
import AddMovementWindow from "../../Components/AddMovementWindow/AddMovementWindow";

import "./MovementsPage.css";
const MovementsPage = () => {
    return (
        <div className="movements-page">
            <TotalBalanceWindow />
            <MovementsWindow />
            {/* <AddMovementWindow /> */}
        </div>
    );
};

export default MovementsPage;
