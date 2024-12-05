import React from "react";
import "./WelcomePage.css";
import { Link } from "react-router-dom";

const WelcomePage = () => {
    return (
        <>
            <Header />
            <Main />
        </>
    );
};

export default WelcomePage;

const Header = () => {
    return (
        <header className="welcome-header">
            <div className="small-logo-container">
                <img src="/img/small-logo.png" alt="" />
            </div>
            <div className="buttons-container">
                <Link to="/in/login">
                    <button className="btn btn-login">Login</button>
                </Link>
                <Link to="/in/register">
                    <button className="btn btn-signup">Sign up</button>
                </Link>
            </div>
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

const Footer = () => {
    return <footer>Footer</footer>;
};
