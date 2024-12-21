import React, { useState } from "react";
import "./WelcomePage.css";
import { Link } from "react-router-dom";
import HamburguerMenuHome from "../../Components/HamburguerMenuHome/HamburguerMenuHome";

const WelcomePage = () => {
    const [isBurguerOpen, setIsBurguerOpen] = useState(false);

    const handleBurguer = (e) => {
        console.log(e.target);
        setIsBurguerOpen((prevState) => {
            return !prevState;
        });
    };

    return (
        <>
            <Header isOpen={isBurguerOpen} />
            <Main />
        </>
    );
};

export default WelcomePage;

const Header = ({ isOpen, handleBurguer }) => {
    return (
        <header className="welcome-header">
            <div className="small-logo-container">
                <Link to="/home">
                    <img src="https://res.cloudinary.com/djdnlogf1/image/upload/v1734110512/small-logo_f0jlfh.png" alt="" />
                </Link>
            </div>
            <div className="buttons-container">
                <Link to="/in/login">
                    <button className="btn btn-login">Login</button>
                </Link>
                <Link to="/in/register">
                    <button className="btn btn-signup">Sign up</button>
                </Link>
            </div>
            <HamburguerMenuHome isOpen={isOpen} />
        </header>
    );
};

const Main = () => {
    return (
        <section className="main gradient-animation-background">
            <div className="home-title">
                <div>
                    <div className="main-title">
                        <h1>CONTROL</h1>
                        <h1>YOUR</h1>
                        <h1>LIFE</h1>
                    </div>
                    <div className="main-subtitle">
                        <h2>Control your money</h2>
                    </div>
                </div>
                <div className="main-description">
                    <div className="main-description-text">
                        <p>
                            <strong>Bancax</strong> is an app that allows you to manage your finances in a simple and easy way. Why making an AI to
                            manage everything when you can do it <i>yourself</i>?
                        </p>
                    </div>
                    <div className="main-description-button">
                        <Link to="/in/register">
                            <button className="btn btn-start">Start now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
