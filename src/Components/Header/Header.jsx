import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalTransaction from "../ModalTransaction/ModalTransaction";
import HamburguerMenu from "../HamburguerMenu/HamburguerMenu";
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
            <HamburguerMenu />
            <div className="movement-buttons">
                <button className="btn btn-deposit" onClick={(e) => handleModalLabel(e)}>
                    Deposit
                </button>
                <button className="btn btn-withdraw" onClick={(e) => handleModalLabel(e)}>
                    Withdraw
                </button>
                {isModalOpen && <ModalTransaction label={label} setIsModalOpen={setIsModalOpen} />}
            </div>
            <div className="logo">
                <Link to="/home">
                    <img src="https://res.cloudinary.com/djdnlogf1/image/upload/v1734110512/logo_njrhjq.png" alt="" />
                </Link>
            </div>
        </header>
    );
};

export default Header;
