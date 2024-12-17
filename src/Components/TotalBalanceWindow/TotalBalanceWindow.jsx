import React, { useEffect, useState } from "react";
import useMovements from "../../Hooks/useMovements";

import "./TotalBalanceWindow.css";

const TotalBalanceWindow = () => {
    const { movements, isLoadingMovements } = useMovements();
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        setTotalBalance(() => {
            return movements.reduce((acc, movement) => acc + movement.amount, 0);
        });
    }, [movements]);

    const getMovementsPerSource = () => {
        const movementsPerSource = [];
        movements.forEach((movement) => {
            movementsPerSource[movement.source] = movementsPerSource[movement.source] || [];
            movementsPerSource[movement.source].push(movement);
        });

        const sourceTotals = Object.keys(movementsPerSource).map((source) => {
            const totalAmount = movementsPerSource[source].reduce((acc, movement) => acc + movement.amount, 0);
            return { source, totalAmount };
        });

        return sourceTotals;
    };

    const sourceTotals = getMovementsPerSource();

    return (
        <div className="total-balance-window">
            <div className="total-balance">
                <h3>Total balance</h3>
                <span>$ {isLoadingMovements ? "..." : totalBalance.toLocaleString()}</span>
            </div>
            <div className="total-balance-details">
                <h4>Details</h4>
                <ul>
                    {sourceTotals.map((source) => (
                        <li key={source.source}>
                            <span>
                                {source.source}: <strong>$ {source.totalAmount}</strong>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TotalBalanceWindow;
