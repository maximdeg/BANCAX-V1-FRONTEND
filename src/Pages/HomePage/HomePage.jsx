import React from "react";
import TotalBalanceWindow from "../../Components/TotalBalanceWindow/TotalBalanceWindow";
import TutorialWindow from "../../Components/TutorialWindow/TutorialWindow";

import "./HomePage.css";

const HomePage = () => {
    return (
        <section className="home-section">
            <TotalBalanceWindow />
            <TutorialWindow></TutorialWindow>
        </section>
    );
};

export default HomePage;
