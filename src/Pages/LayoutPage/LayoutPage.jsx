import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "../../Components/Header/Header";
// import Footer from "../Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";

import "./LayoutPage.css";

const LayoutPage = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="layout-container">
            {location.pathname !== "/in" && <Sidebar />}
            <div className="page-container">
                {location.pathname !== "/in" && <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
                <main className="main">
                    <Outlet />
                </main>
                {/* {location.pathname !== "/login" && <Footer />} */}
            </div>
        </div>
    );
};

export default LayoutPage;
