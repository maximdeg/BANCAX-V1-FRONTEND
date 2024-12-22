import React from "react";
import "./TutorialWindow.css";
import { Link } from "react-router-dom";

const TutorialWindow = () => {
    return (
        <div className="window tutorial-window">
            <h1>How to use Bancax</h1>
            <p>
                Welcome! Here's a quick guide to get you started:
                <br />
                <br />
                1. Go to{" "}
                <Link className="link tutorial-link" to="/settings">
                    <strong>
                        <i>Settings</i>
                    </strong>
                </Link>{" "}
                on the side bar to create the <i className="text-shadow">Sources</i> and <i className="text-shadow">Categories</i> for your income and
                expenses. Pick the correct <i style={{ textShadow: "0px -3px 3px red" }}>C</i>
                <i style={{ textShadow: "0px -3px 3px orange" }}>O</i>
                <i style={{ textShadow: "0px -3px 3px yellow" }}>L</i>
                <i style={{ textShadow: "0px -3px 3px green" }}>O</i>
                <i style={{ textShadow: "0px -3px 3px blue" }}>R</i>
                <i style={{ textShadow: "0px -3px 3px violet" }}>S</i> to make it easier to identify them on the graphs.
                <br />
                <br />
                2. Once you've set up your sources and categories, start using the{" "}
                <Link className="link tutorial-link" style={{ marginTop: "3px" }}>
                    <strong>
                        <i>Deposit</i>
                    </strong>
                </Link>{" "}
                and
                <Link className="link tutorial-link" style={{ marginTop: "3px" }}>
                    <strong>
                        <i>Withdrawal</i>
                    </strong>
                </Link>{" "}
                buttons on top to add transactions.
                <br />
                <br />
                3. Start tracking your expenses and income on the{" "}
                <Link to="/movements" className="link tutorial-link" style={{ marginTop: "3px" }}>
                    <strong>
                        <i>Movements</i>
                    </strong>
                </Link>{" "}
                and
                <Link to="/movements" className="link tutorial-link" style={{ marginTop: "3px" }}>
                    <strong>
                        <i>Category</i>
                    </strong>
                </Link>{" "}
                List tabs.
                <br />
                <br />
                4. We are going to be updating regularly, so keep an eye out for new features!
            </p>
        </div>
    );
};

export default TutorialWindow;
