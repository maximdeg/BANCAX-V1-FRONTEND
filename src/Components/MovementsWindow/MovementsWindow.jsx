import React from "react";
import useMovements from "../../Hooks/useMovements";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./MovementsWindow.css";

const MovementsWindow = () => {
    const { movements, isLoadingMovements } = useMovements();

    const movementOrderedByDate = movements.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="movements-window">
            <div className="movements-title">
                <h2>Movements</h2>
            </div>
            {isLoadingMovements ? <LoadingSpinner /> : <MovementsList movements={movementOrderedByDate} />}
        </div>
    );
};

export default MovementsWindow;

const MovementsList = ({ movements }) => {
    return (
        <div className="movements-list">
            {movements.map((movement) => {
                return <MovementCard key={movement._id} movement={movement} />;
            })}
        </div>
    );
};

const MovementCard = ({ movement }) => {
    const { category, source, amount, description, date } = movement;

    const formattedDate = new Date(date).toLocaleDateString("es-AR");

    return (
        <div className="movement-card" style={amount > 0 ? { borderLeft: "6px solid green" } : { borderLeft: "6px solid red" }}>
            <div className="left-side">
                <div>
                    <span className="date">{formattedDate}</span>
                </div>
                <div className="amount-source">
                    <span className="amount">$ {amount}</span>
                    <span className="source">{source}</span>
                </div>
            </div>
            <div className="right-side">
                <div>
                    <span className="category">{category}</span>
                </div>
                <div>
                    <span className="description">{description}</span>
                </div>
            </div>
        </div>
    );
};
