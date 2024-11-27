import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalTransaction from "../ModalTransaction/ModalTransaction";
import "./Header.css";

const Header = ({ isModalOpen, setIsModalOpen }) => {
    const [label, setLabel] = useState("");
    const handleModalLabel = (e) => {
        e.preventDefault();
        setLabel(e.target.textContent);
        setIsModalOpen(true);
    };

    return (
        <header className="header">
            <div className="movement-buttons">
                <button className="btn btn-deposit" onClick={(e) => handleModalLabel(e)}>
                    Deposit
                </button>
                {/* </Link> */}
                {/* <Link to="/withdraw"> */}
                <button className="btn btn-withdraw" onClick={(e) => handleModalLabel(e)}>
                    Withdraw
                </button>
                {/* </Link> */}
                {isModalOpen && <ModalTransaction label={label} setIsModalOpen={setIsModalOpen} />}
            </div>
            <div className="logo">
                <img src="/img/logo.jpg" alt="" />
            </div>
        </header>
    );
};

export default Header;
