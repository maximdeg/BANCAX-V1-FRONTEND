import React from "react";
import { Outlet } from "react-router-dom";
import "./FormLayoutPage.css";

const FormLayoutPage = () => {
    return (
        <div className="background-picture">
            <section className="form-section animation">
                <div className="form-container">
                    <Outlet />
                </div>
            </section>
        </div>
    );
};

export default FormLayoutPage;
