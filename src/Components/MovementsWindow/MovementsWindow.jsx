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
            {/* TODO: ORDER MOVEMENTS BY DATE DESCENDING */}
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
    return (
        <div className="movement-card">
            <div>
                <div>{date.split("T")[0]}</div>
                <div style={amount > 0 ? { color: "green" } : { color: "red" }}>{amount}</div>
                <div>{source}</div>
            </div>
            <div>
                <div>{category}</div>
                <div>{description}</div>
            </div>
        </div>
    );
};
