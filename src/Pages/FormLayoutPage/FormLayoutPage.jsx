import React from "react";
import { Outlet } from "react-router-dom";
import "./FormLayoutPage.css";

const FormLayoutPage = () => {
    return (
        <section className="form-section">
            <div className="form-container">
                <Outlet />
            </div>
        </section>
    );
};

export default FormLayoutPage;
