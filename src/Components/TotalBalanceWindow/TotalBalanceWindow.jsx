import React, { useEffect, useState } from "react";

import "./TotalBalanceWindow.css";
import useMovements from "../../Hooks/useMovements";

const TotalBalanceWindow = () => {
    const { movements, isLoadingMovements } = useMovements();

    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        setTotalBalance(movements.reduce((acc, movement) => acc + movement.amount, 0));
    }, [movements]);

    return (
        <div className="total-balance-window">
            <div className="total-balance">
                <h3>Total balance</h3>
                <span>AR$ {isLoadingMovements ? "..." : totalBalance}</span>
            </div>
            <div className="total-balance-details">
                <h4>Details</h4>
                <ul>
                    <li>
                        <span>
                            Debito: <strong>AR$ 5000.00</strong>
                        </span>
                    </li>
                    <li>
                        <span>
                            Mercado pago: <strong>AR$ 400.00</strong>
                        </span>
                    </li>
                    <li>
                        <span>
                            Tarjetas de credito: <strong>AR$ 30.00</strong>
                        </span>
                    </li>
                    <li>
                        <span>
                            Efectivo: <strong>AR$ 2.00</strong>
                        </span>
                    </li>
                    <li>
                        <span>
                            Ahorros: <strong>AR$ 0.10</strong>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TotalBalanceWindow;
